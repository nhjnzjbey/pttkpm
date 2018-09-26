import { Item } from 'src/app/user/upload/model/item.model';

export class Post {
    id: number;
    name: string;

    username: string;
    idUser: number;

    items: Item[];
}
