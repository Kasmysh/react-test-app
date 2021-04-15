import { makeStyles } from '@material-ui/core/styles'

export const useAppStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  main: {
    maxWidth: '1200px',
    margin: 'auto',
    // marginTop: '1rem',
    // padding: '1rem',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  infoLine: {
    display: 'flex',
    padding: '0.2rem',
    '& > div': {
      flex: '0 0 auto',
    },
    '& > div:first-child': {
      flex: '1 1 auto',
      marginRight: '0.2rem',
      borderRight: 'solid 2px black',
    }
  },
}));
