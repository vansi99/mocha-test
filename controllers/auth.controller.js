function AuthConTroller() {
    let roles;
    let user;

    function setUser(inUser){
        user = inUser;
    }

    function setRoles(role) {
        roles = role;
    }

    function isAuthorized(neededRole) {
        if(user)
        return user.isAuthorized(neededRole);
    }

    function isAuthorizedAsync(neededRole, cb) {
        setTimeout(function () {
            cb(roles.indexOf(neededRole) >= 0)
        }, 0)
    }

    function isAuthorizedPromise(neededRole, cb) {
        return new Promise((resolve => {
            setTimeout(function () {
                resolve(roles.indexOf(neededRole) >= 0)
            }, 0)
        }));
    }

    function getIndex(req,res) {
        if(req.user.isAuthorized('admin')){
            return res.render('index');
        }
        res.render('error');
    }

    return {
        isAuthorized,
        isAuthorizedAsync,
        setRoles,
        isAuthorizedPromise,
        getIndex,
        setUser
    };
}

module.exports = AuthConTroller();