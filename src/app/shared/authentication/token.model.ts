import { configuration } from "../../../environments/.env";


// Avoid TS error "cannot find name escape"
declare function escape(s:string): string;

export class TokenError extends Error {
    
    name = "TokenError";

    constructor(message: string) {
        super(message)
    }
}

export class Token {
    serverUrl = configuration.API_BASE_URL;
    constructor(
        public token: string
    ) {
        // Set token back to null if it is expired.
        if(this.isExpired()) {
            token = null;
        }
    }

    private decodeBase64(str: string): string {
        let output = str.replace(/-/g, '+')
                        .replace(/_/g, '/');
        switch(output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw new TokenError('Illegal base64url string!');
            }
        }

        return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output)));
    }

    public decodeToken(): any {
        let parts = this.token.split('.');

        if(parts.length !==3) {
            throw new TokenError('A JWT Token must have 3 parts!');
        }

        let decoded = this.decodeBase64(parts[1]);
        if(!decoded) {
            throw new TokenError('Cannot decode the token!');
        }

        return JSON.parse(decoded);
    }

    /**
     * Gets the expiration date of this token.
     */
    public getExpirationDate(): Date {
      
        let decoded = this.decodeToken();

        if(!decoded.hasOwnProperty('exp')) {
            return new Date();
        }

        let date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
      
    }

    /**
     * Check whether the token has been expired already.
     */
    public isExpired(offsetSeconds: number = 0): boolean {
        if (this.token) {
          let date = this.getExpirationDate();
  
          if(date.getSeconds() === new Date().getSeconds()) {
              return false;
          }

          return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
        } else {
          return false;
        }
    }

    public getCurrentUserId(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('_id')) {
            return null;
        }
        return decoded._id;
    }

    public getCurrentEmailId(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('email')) {
            return null;
        }
        return decoded.email;
    }
    
    public getFirstName(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('firstName')) {
            return null;
        }
        return decoded.firstName;
    }

    public getLastName(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('lastName')) {
            return null;
        }
        return decoded.lastName;
    }
    
    public getCurrentUserName(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('name')) {
            return null;
        }
        return decoded.name;
    }

    public getUserType (): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('userType')) {
            return null;
        }
        return decoded.userType;
    }
    
    public getUserPicture(): string {
        const decoded = this.decodeToken();
        if (!decoded.hasOwnProperty('pic')) {
            return null;
        }
        const pic = decoded.pic;
        return this.serverUrl + "/uploadFile/" + pic.container + "/" + pic.name;
    }

}
