export const instructorMenuTitle = 'מדריך תפריט למדריך';
export const parentMenuTitle = 'תפריט להורה';
export const managerMenuTitle = 'תפריט מנהל';

export const instructorMenuItems = [
  { label: 'דף הבית של מדריך', screen: 'InstructorHomepage' },
  { label: 'בחר קבוצה', screen: 'SelectGroup' },
  {
    label: 'פרטי קבוצה',
    screen: 'GroupDetails',
    params: { group: { title: 'קבוצה', subtitle: '' } },
  },
  { label: 'רשימת ילדים', screen: 'ChildList' },
  { label: 'פרופיל ילד', screen: 'ChildProfile', params: { child: { name: 'עידו כהן' } } },
  { label: 'עריכת הישג', screen: 'EditAchievement' },
];

export const parentMenuItems = [
  { label: 'לוח הורה', screen: 'ParentHomepage' },
  { label: "צ'אט עם מדריך", screen: 'ParentChat' },
  { label: 'דו"ח התקדמות של הילד', screen: 'ParentProgressReport' },
  { label: 'קביעת מפגש חדש', screen: 'ParentScheduleMeetingNew' },
];

export const managerMenuItems = [
  { label: 'פאנל מנהל', screen: 'ManagerHomepage' },
  { label: 'הגדרות מרכז', screen: 'ManagerCenterSettings' },
  { label: 'דו"חות מערכת', screen: 'ManagerSystemReports' },
  { label: 'דו"ח נוכחות', screen: 'ManagerAttendanceReport' },
  { label: 'ניהול ילדים', screen: 'ManagerManageChildren' },
  { label: 'ניהול מדריכים', screen: 'ManagerManageInstructors' },
];
