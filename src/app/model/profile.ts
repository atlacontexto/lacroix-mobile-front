export class ProfileModel {
    _id: string;
    type: string;
    createdAt: Date;
    icon: string;
    
    constructor(jsonString: string) {
        let jsonObj: any = JSON.parse(jsonString);
        console.log(jsonObj);
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }

    update(number: number) {
        
    }
}