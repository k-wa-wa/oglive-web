

const LoginPrompt = () => {
  return (
    <div>
      権限がありません。ログインしてください。<br />
      <a href="/api/auth/login"> {/* eslint-disable-line */}
        ⇨⇨Login
      </a>
    </div>
  );
};

export default LoginPrompt;