
    const cart  = {
        item: [{
            name: "",
            quantity: 0
        }]
    }

    function addToCart(ele) { 
        let name = $(ele).parent().parent().find('.info h3').text();
        cart.item.push({
            name: name,
            quantity: 0
        })
    }

    function sendData() {

        let newItem = cart;
        let todo = {
            item: newItem
        };

        fetch("/cart", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
        })
        .then( (result) => result.json)
        .then(data => {
            window.location.assign('/restaurants')
        })
    } 

    // (res) => res.json())
    //         .then((result) => {
    //             // window.location.assign('/newPath')
    //             console.log("joic")
    //         })
    //             .catch((err) => console.log(err))