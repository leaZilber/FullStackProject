import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, Filler } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BaseChartDirective } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import { AuthService } from '../../services/auth.service';

Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Filler
);


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, BaseChartDirective],
  providers: [DatePipe],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  daysOfWeek = [
    { value: 0, label: 'ראשון' },
    { value: 1, label: 'שני' },
    { value: 2, label: 'שלישי' },
    { value: 3, label: 'רביעי' },
    { value: 4, label: 'חמישי' },
    { value: 5, label: 'שישי' },
    { value: 6, label: 'שבת' }
  ];

  selectedDay: number = new Date().getDay();
  startDate: string = '';
  endDate: string = '';

  userCountFilter: number | null = null;
  userTypes = [
    { value: 'all', label: 'כל המשתמשים' },
    { value: 'new', label: 'משתמשים חדשים' },
    { value: 'returning', label: 'משתמשים חוזרים' },
    { value: 'inactive', label: 'משתמשים לא פעילים' }
  ];
  selectedUserType: string = 'all';

  public pieChartLabels: string[] = ['משתמשים חדשים', 'משתמשים חוזרים', 'משתמשים לא פעילים'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;

            // מסנן רק ערכים שהם מספר
            const data = context.chart.data.datasets[0].data.filter((item): item is number => typeof item === 'number');
            const total = data.reduce((a, b) => a + b, 0);

            const percentage = total > 0 ? Math.round((value as number / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // נתוני תרשים קווי לאורך זמן
  public lineChartData = {
    datasets: [
      {
        data: [] as number[],
        label: 'סה״כ משתמשים',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        borderColor: 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: 'rgba(0, 123, 255, 1)',
        fill: true
      },
      {
        data: [] as number[],
        label: 'משתמשים חדשים',
        backgroundColor: 'rgba(40, 167, 69, 0.3)',
        borderColor: 'rgba(40, 167, 69, 1)',
        pointBackgroundColor: 'rgba(40, 167, 69, 1)',
        fill: true
      }
    ],
    labels: [] as string[]
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public lineChartType: ChartType = 'line';

  // נתוני תרשים עמודות לפי שעות
  public barChartData = {
    datasets: [
      {
        data: [] as number[],
        label: 'משתמשים לפי שעה',
        backgroundColor: 'rgba(255, 193, 7, 0.5)',
        borderColor: 'rgba(255, 193, 7, 1)',
      }
    ],
    labels: [] as string[]
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  public barChartType: ChartType = 'bar';

  // נתונים מלאים מהשרת
  busiestHours: any[] = [];
  filteredData: any[] = [];
  usersOverTime: any[] = [];
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;

  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService,
  ) {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.startDate = this.formatDate(thirtyDaysAgo);
    this.endDate = this.formatDate(today);
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  // goToLoginPage(): void {
  //   this.router.navigate(['/loginAdmin'], { replaceUrl: true });
  // }
  goToLoginPage(): void {
    if (typeof window !== 'undefined') {
      this.router.navigate(['/loginAdmin'], { replaceUrl: true });
    }
  }
  
  loadAllData(): void {
    this.isLoading = true;

    // טעינת נתוני שעות עמוסות
    this.authService.getUserStatsOverTime().subscribe(data => {
        this.busiestHours = data.map(item => ({
          day: this.getDayLabel(parseInt(item.day)),
          dayValue: parseInt(item.day),
          hour: item.hour,
          hourFormatted: `${item.hour}:00`,
          users: item.count,
          date: new Date()
        }));

        // טעינת נתוני משתמשים לאורך זמן
        this.loadUsersOverTime();
      }, error => {
        console.error('Error loading busiest hours', error);
        this.isLoading = false;
      });
  }

  // loadUsersOverTime(): void {
  //   // בסביבה אמיתית, זה יהיה מאפיין API נפרד
  //   // כאן אנחנו מדמים נתונים לתצוגת משתמשים לאורך זמן
  //   const today = new Date();
  //   this.usersOverTime = [];

  //   for (let i = 30; i >= 0; i--) {
  //     const date = new Date(today);
  //     date.setDate(date.getDate() - i);

  //     const newUsers = Math.floor(Math.random() * 50) + 5;
  //     const totalToDate = 1000 + (30 - i) * 30 + Math.floor(Math.random() * 100);

  //     this.usersOverTime.push({
  //       date: date,
  //       newUsers: newUsers,
  //       totalUsers: totalToDate
  //     });
  //   }

  //   this.totalUsers = this.usersOverTime[this.usersOverTime.length - 1].totalUsers;
  //   this.activeUsers = Math.floor(this.totalUsers * 0.7);

  //   this.inactiveUsers = this.totalUsers - this.activeUsers;

  //   this.applyFilters();
  //   this.isLoading = false;
  // }
  loadUsersOverTime(): void {
    this.isLoading = true;
    
    this.authService.getUserStatsOverTime().subscribe({
      next: (data) => {
        this.usersOverTime = data;
  
        if (this.usersOverTime.length > 0) {
          this.totalUsers = this.usersOverTime[this.usersOverTime.length - 1].totalUsers;
          this.activeUsers = Math.floor(this.totalUsers * 0.7);
          this.inactiveUsers = this.totalUsers - this.activeUsers;
        }
  
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading user stats:', err);
        this.isLoading = false;
      }
    });
  }
  
  formatDate(date: Date): string {
    if (!this.datePipe) {
      console.error('DatePipe is not available');
      return '';
    }
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }

  applyFilters(): void {
    this.filteredData = this.busiestHours.filter(item => {
      const matchesDay = this.selectedDay === -1 || item.dayValue === this.selectedDay;
      const matchesCount = !this.userCountFilter || item.users >= this.userCountFilter;
     return matchesDay && matchesCount;
    });

    this.updatePieChart();

    this.updateLineChart();

    this.updateBarChart();
  }

  updatePieChart(): void {
    const totalUsers = this.totalUsers;
    const newUsers = Math.floor(totalUsers * 0.3);
    const returningUsers = Math.floor(totalUsers * 0.5);
    const inactiveUsers = totalUsers - newUsers - returningUsers;

    this.pieChartData = [newUsers, returningUsers, inactiveUsers];

    if (this.chart) {
      this.chart.update();
    }
  }

  updateLineChart(): void {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const filteredTimeData = this.usersOverTime.filter(item => {
      const date = new Date(item.date);
      return date >= start && date <= end;
    });

    this.lineChartData.labels = filteredTimeData.map(item => {
      if (!this.datePipe) {
        return '';
      }
      return this.datePipe.transform(item.date, 'dd/MM') || '';
    });

    this.lineChartData.datasets[0].data = filteredTimeData.map(item => item.totalUsers);
    this.lineChartData.datasets[1].data = filteredTimeData.map(item => item.newUsers);

    if (this.chart) {
      this.chart.update();
    }
  }

  updateBarChart(): void {
    const hourlyData = new Array(24).fill(0);
    const filteredByDay = this.selectedDay === -1 ?
      this.busiestHours :
      this.busiestHours.filter(item => item.dayValue === this.selectedDay);

    filteredByDay.forEach(item => {
      hourlyData[item.hour] += item.users;
    });

    this.barChartData.labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    this.barChartData.datasets[0].data = hourlyData;

    if (this.chart) {
      this.chart.update();
    }
  }

  onDayChange(): void {
    this.applyFilters();
  }

  onDateRangeChange(): void {
    this.applyFilters();
  }

  onUserCountFilterChange(): void {
    this.applyFilters();
  }

  onUserTypeChange(): void {
    this.applyFilters();
  }

  getDayLabel(dayValue: number): string {
    const day = this.daysOfWeek.find(d => d.value === dayValue);
    return day ? day.label : '';
  }

  getDayValue(dayLabel: string): number {
    const day = this.daysOfWeek.find(d => d.label === dayLabel);
    return day ? day.value : -1;
  }

  // צבעים לציון עומס
  getColor(users: number): string {
    if (users > 70) return '#c0392b';
    if (users > 50) return '#e67e22';
    if (users > 30) return '#f1c40f';
    return '#2ecc71';
  }

  // פונקציה לאיפוס כל הפילטרים
  resetFilters(): void {
    this.selectedDay = -1;
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.startDate = this.formatDate(thirtyDaysAgo);
    this.endDate = this.formatDate(today);
    this.userCountFilter = null;
    this.selectedUserType = 'all';
    this.applyFilters();
  }

  // הורדת הנתונים כקובץ CSV
  exportToCSV(): void {
    const headers = ['יום', 'שעה', 'מספר משתמשים'];
    const csvData = this.filteredData.map(row => {
      return `${row.day},${row.hourFormatted},${row.users}`;
    });

    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const link = document.createElement('a');
      link.href = url;
      link.download = `users-report-${new Date().toISOString().slice(0, 10)}.csv`;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', `users-report-${new Date().toISOString().slice(0, 10)}.csv`);
    // link.style.visibility = 'hidden';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }
}