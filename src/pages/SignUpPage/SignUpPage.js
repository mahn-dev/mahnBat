import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';

import InputForm from '~/components/InputForm';
import Button from '~/components/Button';
import * as UserService from '~/services/UserService';
import { useMutationHooks } from '~/hooks/useMutationHook';

const cx = classNames.bind(styles);

function SignUpPage() {
    const navigate = useNavigate();
    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { data, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            handleNavigateSignIn();
        } else if (isError) {
        }
    }, [isSuccess, isError]);

    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };

    const handleOnChangeUsername = (value) => {
        setUsername(value);
    };
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangePassword = (value) => {
        setPassword(value);
    };
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const handleSignUp = () => {
        mutation.mutate({
            username,
            email,
            password,
            confirmPassword,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('heading')}>Đăng ký</h2>
                <div className={cx('form-container')}>
                    <div className={cx('form-item')}>
                        <span className={cx('form-title')}>Tên tài khoản *</span>
                        <InputForm value={username} onChange={handleOnChangeUsername} />
                    </div>
                    <div className={cx('form-item')}>
                        <span className={cx('form-title')}>Email *</span>
                        <InputForm value={email} onChange={handleOnChangeEmail} />
                    </div>
                    <div className={cx('form-item')}>
                        <span className={cx('form-title')}>Mật khẩu *</span>
                        <InputForm type="password" value={password} onChange={handleOnChangePassword} />
                    </div>
                    <div className={cx('form-item')}>
                        <span className={cx('form-title')}>Nhập lại mật khẩu *</span>
                        <InputForm type="password" value={confirmPassword} onChange={handleOnChangeConfirmPassword} />
                    </div>
                </div>
                {data?.status === 'err' && <span>{data?.message}</span>}
                <p className={cx('policy')}>
                    Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, để
                    quản lý quyền truy cập vào tài khoản của bạn và cho các mục đích khác được mô tả trong{' '}
                    <Link className={cx('policy-link')} to="/sign-in">
                        chính sách bảo mật
                    </Link>{' '}
                    của chúng tôi.
                </p>
                <Button
                    className={cx('signup-btn')}
                    onClick={handleSignUp}
                    disabled={!username || !password.length || !confirmPassword.length}
                    primary
                >
                    Đăng ký
                </Button>
            </div>
            <div className={cx('signin-action')}>
                <span>Bạn đã có tài khoản ?</span>
                <Link className={cx('signin-link')} to="/sign-in">
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default SignUpPage;
