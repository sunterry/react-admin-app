import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import config from './config';
import styles from './exception.module.scss';

const Exception = (props) => {
  const { className, backText, redirect, desc, title, img, type, ...rest } = props;
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div className={styles.imgEle} style={{ backgroundImage: `url(${img || config[type].img})` }}/>
      </div>
      <div className={styles.content}>
        <h1>{  title || config[type].title }</h1>
        <div className={ styles.desc }>{ desc || config[type].desc }</div>
        <div className={styles.actions}>
            <Button href={ redirect } type="primary">{ backText }</Button>
        </div>
      </div>
    </div>
  )
};

Exception.propTypes = {
  backText: PropTypes.string,
  redirect: PropTypes.string,
  desc: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};

Exception.defaultProps = {
  backText: '回到首页',
  redirect: '/',
  desc: '',
  title: '',
  type: '404'
};

export default Exception;
