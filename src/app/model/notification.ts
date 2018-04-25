import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

export class NotificationModel {
    authService: AuthServiceProvider;
    
    constructor(authService: AuthServiceProvider) {
        this.authService = authService;
    }

    sendSms(number: number) {
        
    }
}