let express = require('express');
let router = express.Router();
let multipart = require('connect-multiparty');
let fs = require('fs');
let path = require('path')
const {log} = require("debug");

let multipartMiddleware = multipart({uploadDir: './uploads'});

/* POST session listing */
router.post('/editor', multipartMiddleware, function(req, res, next) {
    let action = req.body.runOrDownload;
    if(action === 'UPLOAD') {
        let path = req.files.fileDaInput.path;
        fs.readFile(path, {encoding: 'utf8'}, function (err, data) {
            if (err) {
                res.render('editor', {arr: ['']})
                throw err;
            }
            let arrData = data.split('\n');
            try {
                fs.unlinkSync(path);
            } catch (err) {}

            res.render('editor', {arr: arrData});
        });
    } else if(action === 'editor per programmare') {
        res.render('editor', {arr: ['']});
    } else if(action === 'RUN') {
        res.render('editor', {arr: ['']});
    }
    else {
        let content = req.body.lines;
        if (content !== undefined) {
            fs.writeFile('downloads/file.py', content, {encoding: 'utf8'}, function(err) {
                if(err)
                    console.log('error');
            });
        } else {
            fs.readdir('uploads', {withFileTypes: true}, function(err, data) {
                if(err)
                    console.log(err);
                else {
                    let t1 = data;
                    t1.forEach(f => {
                        fs.rm(path.join(__dirname, '..', 'uploads', f.name), function(err) {
                            if(err)
                                console.log(err);
                        });
                    });
                }
            })
            res.download('downloads/file.py');
        }
    }
});

router.post('/interface', function(req, res, next) {
    res.render('controlsInterface');
});


/* GET session listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// solo per entrare, sarà da concellare
router.get('/editor', function(req, res, next) {
    res.render('editor', {arr: ['']});
});

module.exports = router;
