import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ColorValue } from '../const.js';

export default class Common {
  static formatDate(date) {
    return moment(date).format(`DD MMMM`);
  }

  static formatTime(date) {
    return moment(date).format(`hh:mm A`);
  }

  static isRepeating(repeatingDays) {
    return Object.values(repeatingDays).some(Boolean);
  }

  static isOverdueDate(dueDate, date) {
    return dueDate < date && !this.isOneDay(date, dueDate);
  }

  static isOneDay(dateA, dateB) {
    const a = moment(dateA);
    const b = moment(dateB);
    return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
  }

  static getUniqItems(item, index, array) {
    return array.indexOf(item) === index;
  }

  static getTasksByDateRange(tasks, dateFrom, dateTo) {
    return tasks.filter((task) => {
      const dueDate = task.dueDate;

      return dueDate >= dateFrom && dueDate <= dateTo;
    });
  }

  static createRandomColor() {
    const value = Math.floor(Math.random() * 0xffffff);

    return `#${value.toString(16)}`;
  }

  static createPlaceholder(dateFrom, dateTo) {
    const format = (date) => {
      return moment(date).format(`DD MMM`);
    };

    return `${format(dateFrom)} - ${format(dateTo)}`;
  }

  static calcUniqCountColor(tasks, color) {
    return tasks.filter((it) => it.color === color).length;
  }

  static calculateBetweenDates(from, to) {
    const result = [];
    let date = new Date(from);

    while (date <= to) {
      result.push(date);

      date = new Date(date);
      date.setDate(date.getDate() + 1);
    }

    return result;
  }

  static renderColorsChart(colorsCtx, tasks) {
    const colors = tasks
      .map((task) => task.color)
      .filter(this.getUniqItems);

    return new Chart(colorsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: colors,
        datasets: [{
          data: colors.map((color) => this.calcUniqCountColor(tasks, color)),
          backgroundColor: colors.map((color) => ColorValue[color])
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });
  }

  static renderDaysChart(daysCtx, tasks, dateFrom, dateTo) {
    const days = this.calculateBetweenDates(dateFrom, dateTo);

    const taskCountOnDay = days.map((date) => {
      return tasks.filter((task) => {
        return this.isOneDay(task.dueDate, date);
      }).length;
    });

    const formattedDates = days.map((it) => moment(it).format(`DD MMM`));

    return new Chart(daysCtx, {
      plugins: [ChartDataLabels],
      type: `line`,
      data: {
        labels: formattedDates,
        datasets: [{
          data: taskCountOnDay,
          backgroundColor: `transparent`,
          borderColor: `#000000`,
          borderWidth: 1,
          lineTension: 0,
          pointRadius: 8,
          pointHoverRadius: 8,
          pointBackgroundColor: `#000000`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 8
            },
            color: `#ffffff`
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              fontStyle: `bold`,
              fontColor: `#000000`
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  static renderTagsChart(tagsCtx, tasks) {
    const tagsLabels = tasks.map((task) => task.tags)
      .reduce((acc, tags) => {
        return acc.concat(Array.from(tags));
      }, [])
      .filter(this.getUniqItems);

    return new Chart(tagsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: tagsLabels,
        datasets: [{
          data: tagsLabels.map((tag) => tasks.reduce((acc, task) => {
            const targetTasksCount = Array.from(task.tags)
              .filter((it) => it === tag).length;

            return acc + targetTasksCount;
          }, 0)),
          backgroundColor: tagsLabels.map(this.createRandomColor)
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];

              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);

              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: TAGS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });
  }
}
