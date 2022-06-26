import axios from "axios";
import { IUser } from "models/user";
import {urlLoginAPI, urlSignUpLocationAPI, urlRegisterAPI} from '../utils/constants'
import { ISignUpParams } from './../models/auth';

interface IAPIRes {
    message: string;
    error: boolean;
    code: number;
    data: IUser;
}

interface ISignUpLocationsAPIRes {
    message: string;
    error: boolean;
    code: number;
    data: [];
}


export const handleLoginAPI = (email: string, password: string): IAPIRes => {
    return <IAPIRes>(
        (<unknown>
            (axios.post(urlLoginAPI, { email, password })
            .then(response => response.data)
            .catch(error => error.response.data)
        ))
    )
};

export const handleSignUpLocationsAPI = (): ISignUpLocationsAPIRes => {
    return <ISignUpLocationsAPIRes>(
        (<unknown>
            (axios.get(urlSignUpLocationAPI)
            .then(response => response.data)
            .catch(error => error.response.data)
        ))
    )
};

export const handleRegisterAPI = (values: ISignUpParams) : IAPIRes => {
    return <IAPIRes>(
        (<unknown>
            (axios.post(urlRegisterAPI, values)
            .then(response => response.data)
            .catch(error => error.response.data)
        ))
    )
}


