const tintColor = '#2f95dc';

const theme = {
  // Ionic name styles
  primary: '#3cb371', //mediumseagreen
  secondary: '#87cefa',//lightskyblue
  danger: '#cd5c5c',//indianred
  light: '#f4f4f4',
  dark: '#222',
  warning: '#ffd700', //gold
}

const social = {
  facebook: '#3b5998',
}

export default {
  // boilerplate
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  ... theme,
  ... social,
};
