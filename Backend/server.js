const express = require('express');
const app = express()

app.get('/path/:breadcrumbs', (req, res) => {
    let root = {
        type: "dir",
        children: {
            home: {
                type: "dir",
                children: {
                    myname: {
                        type: "dir",
                        children: {
                            "filea.txt": {
                                type: "file",
                            },
                            "fileb.txt": {
                                type: "file",
                            },
                            "projects": {
                                type: "dir",
                                children: {
                                    mysupersecretproject: {
                                        type: "dir",
                                        children: {
                                            mysupersecretfile: {
                                                type: "file",
                                            },
                                        },
                                    }
                                },
                            },
                        }
                    },
                },
            }
        },
    };

    path_str = req.params.breadcrumbs.split(/->/).join(".children.")
    // console.log(root.children.home)
    let path =  eval(path_str)
    console.log(path.type)
    // console.log(Object.keys(path.type))
    children_result = []

    for (const [key, value] of Object.entries(path.children)) {
        console.log(key, value);
        children_result.push({'name': key,'type':value.type})
    }

    res.json(
        {
            type: path.type,
            address: req.params.breadcrumbs.split(/->/),
            children: children_result
        }
    )
})



app.listen(3000)
