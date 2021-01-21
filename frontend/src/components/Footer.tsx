import React from 'react';
import { AppBar, Typography  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign:'center',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        padding: '20px'
    }
}));

const Footer = (): JSX.Element => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar}>
            <Typography variant="body2" className={classes.title}>
                Copyright reserved.
            </Typography>
        </AppBar>
    )
}

export default Footer;