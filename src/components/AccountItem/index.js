import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
const cx = classNames.bind(styles);
function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx("avatar")}src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/7d2eae599284c0f2daddead37d226c4a~c5_300x300.webp?x-expires=1675476000&x-signature=d8tHVV7FHbsJwMlP1xC%2Fn46Skk0%3D" alt=""/>
            <div className={cx("infor")}>
               <h4 className={cx("name")}>
                <span>Nguyen Van A</span>
                <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
               </h4>
               <span className={cx("username")}>nguyenvana</span>
            </div>
        </div>
     );
}

export default AccountItem;                         