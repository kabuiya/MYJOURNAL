(function() {
    function isLoggedIn() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        // Optional: Check if token is expired
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp < Date.now() / 1000) {
                localStorage.removeItem('token');
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    if (!isLoggedIn()) {
        window.location.replace('login.html');
    }
})();