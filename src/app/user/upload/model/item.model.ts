import { Address } from 'src/app/user/upload/model/address.model';

export class Item {
    index: number;
    id: string;
    type: string;
    name: string;
    description: string;
    urlFile: string;
    address: Address;
    src: string;
    file: string;

    constructor() {
        this.description = '';
        this.address = new Address();
    }

}
