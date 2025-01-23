import axios from "axios";
import { TokenMixin } from "../mixins/UserMixins";


export class UserApiService {
    static async informationAboutUser() {
        const tokens = await TokenMixin.tokenData();
        const req = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user/information_about_user", {
            headers: {
                "Authorization": "Bearer " + tokens[0]
            }
        });
        
        if (req.status === 200) {
            return req.data
        } else {
            return false
        }
    }
}