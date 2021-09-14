import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import style from './header.module.css';

class Header extends React.Component{
    render (){
        return(
            <>
                <header className="d-flex p-4 align-items-center">
                    <div>
                        <img src='https://natv.kg/static/user/ima/logo.png'/>
                    </div>
                    <nav className={style.navBlock}>
                       <Link>Каналы</Link>
                       <Link>Способы оплаты</Link>
                       <Link>Вопросы ответы</Link>
                       <Link>Видео инструкция</Link>
                    </nav>
                </header>
            </>
        )
    }
}
export default Header;