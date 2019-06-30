Impementing file upload download 

Steps
    1. In views - to input file make input type ="file" 
    2. Now we have our file in our hand but we need to "multer" that will parse incoming req for files
    3. In views where add enctype="multipart/form-data"
    4.  if previous ectype is found in form then only multer will look for parsing file 
    5. In app.js -   app.use(multer({dest: 'images'}).single('name of input'));
    6. req.file will contain our file
    
    7. small changes in point5
    const fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null , 'images');
        },
        filename: (req, file, next) => {
            next(null, new Date().toISOString() + '-' + file.originalname);
        }
    }) 
    app.use(multer({storage: fileStorage}).single('name of input'));

    8. filteing files
        const fileFilter = (req, file, next) => {
            if()
        } 

    9. we will not save files in database but there links will be stored in database
    imageUrl = image.path


1. home
2. add res / view res - notification bar
3. restauant model