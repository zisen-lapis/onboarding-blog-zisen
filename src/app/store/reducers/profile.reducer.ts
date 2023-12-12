import {Gender, IProfile} from "../../profile/profile.interface";
import {createReducer, on} from "@ngrx/store";
import {editProfile} from "../actions/profile.action";

export const initialState : IProfile = {
    name: '',
    address: '',
    gender: Gender.Male,
    editTime: new Date(),
}


export const profileReducer = createReducer(
    initialState,
    on(editProfile,(state,action) => (
        {...state,...action
        })),
);