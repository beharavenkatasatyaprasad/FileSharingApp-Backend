import {accessKeyId,secretAccessKey} from './s3-config.json'
export const smtp = {
    service: 'gmail',
    auth: {
        user: 'mockmail4me@gmail.com', // generated ethereal user
        pass: 'qdiodybswwjdygdm'  // generated ethereal password
    }
};



export const url = 'https://fileshareapp.heroku.app';

export const s3Config = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
};


export const s3Region = 'ap-south-1'
export const s3Bucket = 'filesendingapp'
