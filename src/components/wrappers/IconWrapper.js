
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import { ImageList } from '@mui/material';
import { Paths } from '../../Constants';


const useStyles = makeStyles({
  imageIcon: {
    height: '90%',
    textAlign: "center"
  },
  iconRoot: {
  }
});

export default function IconWrapper(props) {
  const classes = useStyles()
  const { path } = props
  return (
    <Icon classes={{ root: classes.iconRoot }}>
      <img className={classes.imageIcon} src={path} />
    </Icon>
  )
}