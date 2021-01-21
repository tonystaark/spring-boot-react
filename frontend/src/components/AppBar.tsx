import React from 'react';
import { AppBar,  Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useMutation } from "react-query";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {IDefaultState} from '../constants/type'
import {LogOutSuccessAction} from "../redux/actions/signInAction";
import { getJWTTokenFromLocalStorage } from "../utils/index";

const { REACT_APP_RESOURCES_IMAGE_PATH } = process.env;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const CustomedAppBar = (): JSX.Element => {
    const classes = useStyles();
    const loggedIn = useSelector((state: IDefaultState) => state.signInSuccess)
    const history = useHistory();
    const dispatch = useDispatch();

    const [logOut] = useMutation(() => axios.post("/api/auth/logout", null,{ headers: {'Authorization': 'Bearer ' + getJWTTokenFromLocalStorage()}}), {
        onSuccess: () => {
            history.push('/');
            dispatch(LogOutSuccessAction)
        },
    });
    const postLogOut = async():Promise<void> => {
        await logOut();
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img src={`${REACT_APP_RESOURCES_IMAGE_PATH}/seab-logo.png`} alt='Maintenance' height="60px" width="auto"/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    SEAB Candidates Portal
                </Typography>
                {loggedIn && <Button color="inherit" onClick={postLogOut}>Logout</Button>}
            </Toolbar>
        </AppBar>
    )
}

export default CustomedAppBar;