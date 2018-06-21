export const navigation = [
  {
    name: 'nav.title.dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'nav.title.myadmin'
  },
  {
    name: 'nav.link.myprofile',
    url: '/myadmin/profile',
    icon: 'icon-user'
  },
  {
    name: 'nav.link.timesheet',
    url: '/myadmin/timesheet',
    icon: 'icon-clock'
  },
  {
    name: 'nav.link.expense',
    url: '/myadmin/expense',
    icon: 'icon-credit-card'
  },
  {
    name: 'nav.link.vacation',
    url: '/myadmin/vacation',
    icon: 'icon-globe'
  },
  {
    title: true,
    name: 'nav.title.projectmanager'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'nav.title.configuration'
  },
  {
    name: 'nav.dropdown.parameter',
    url: '/parameters',
    icon: 'fa fa-gears',
    children: [
      {
        name: 'nav.link.currency',
        url: '/parameters/currencies',
        icon: 'fa fa-euro'
      },
      {
        name: 'nav.link.country',
        url: '/parameters/countries',
        icon: 'icon-flag'
      }
    ]
  }
];
