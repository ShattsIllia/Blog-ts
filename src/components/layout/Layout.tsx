import {SideBar} from './SideBar/SideBar';
import styles from "./Layout.module.scss";
import React from 'react';


const Layout = ({ children }:  any) => {
    return (
        <div className={styles.wrapper}>
            <SideBar/>
            <div className={styles.childrens}>{children}</div>
        </div>
    );
}

export const withLayout = (Component: any) => {
    return function withLayoutComponent(props: any) {
        return (
                <Layout>
                    <Component {...props} />
                </Layout>
        );
    };
};