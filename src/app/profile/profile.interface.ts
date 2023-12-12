export enum Gender {
    Male = 'Male',
    Female = 'Female'
}
export interface IProfile {
    name: string | null | undefined;
    address: string | null | undefined;
    gender: Gender | null | undefined;
    editTime: Date | null | undefined;
}