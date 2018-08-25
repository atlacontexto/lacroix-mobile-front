import { AuthProvider } from "../../providers/auth/auth";

export class NotificationModel {
    authService: AuthProvider;
    
    constructor(authService: AuthProvider) {
        this.authService = authService;
    }

    sendSms(number: number) {
        
    }
}