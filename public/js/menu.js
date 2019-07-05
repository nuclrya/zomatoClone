let total = 0;
let name="";
let price= 0;
let quantity = 1;
let ctr = 0;
let s;
    const cart  = {
        items: [],
        total: 0
    }
var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
var isLoggedIn = document.querySelector('meta[name="isLoggedIn"]').getAttribute('content')


$('.item_category .item .but .button').click(function() {
    if( isLoggedIn ) {
    if(ctr === 0){
        $('.cart *').remove();
        $(".cart").css({
            'background': '#eee'
        });
        name = $(this).parent().parent().find(".info h3").text();
        price = $(this).parent().parent().find(".info h4").text();
        s = price.search("₹");
        total = Number(price.slice(s+1));
        ctr++;
        $('.cart').html("<div class='checkout'><h2>Cart</h2><div class='items'><div class='item'><p id='name'>"+name+"</p><div class='counter'><a onClick='incrementQuantity(this, 0)'><i class='fa fa-plus' aria-hidden='true'></i></a><p class='count'>"+ quantity +"</p><a onClick='decrementQuantity(this, 0)'><i class='fa fa-minus' aria-hidden='true'></i></a></div> <p id='rate'>"+price+"</p></div></div><div class='total'><div><p class='subtotal'> Subtotal</p><p class='net'>₹" + total + "</p></div><button onClick='sendData()'>Add to Cart</button></div></div>")
        cart.items.push({
            name: name,
            quantity: 1,
            rate: total
        })
        cart.total = total;
        $(this).parent().html("<div class='added'><a class='button'> Added to Cart <a></div>")
    }
    else{
        name = $(this).parent().parent().find(".info h3").text();
        price = $(this).parent().parent().find(".info h4").text();
        s = price.search("₹");
        total += Number(price.slice(s+1));
        $('.cart .checkout .items').append("<div class='item'><p id='name'>"+name+"</p><div class='counter'><a onClick='incrementQuantity(this, 0)'><i class='fa fa-plus' aria-hidden='true'></i></a><p class='count'>"+ quantity +"</p><a onClick='decrementQuantity(this, 0)'><i class='fa fa-minus' aria-hidden='true'></i></a></div> <p id='rate'>"+price+"</p></div>");
        $(".cart .checkout .total .net").text("₹"+total+".00"); 
        cart.items.push({
            name: name,
            quantity: 1,
            rate: Number(price.slice(s+1))
        })
        cart.total = total;
        $(this).parent().html("<div class='added'><a class='button'> Added to Cart <a></div>")


    }
}
else {
    $("li[class='high'] a[href='/login']").parent().addClass('attention')
    setTimeout(
        function() 
        {
            $(".attention").removeClass("attention")       
         }, 750 );
}
})



    function addToCart(ele) { 
        
    }

    function sendData() {
        
        let url = window.location.href;
        let ID = url.slice(url.search('restaurants') + 12);
        cart.resID = ID;

        let newItem = cart;
        let todo = {
            item: newItem
        };

        fetch("/cart", {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 
                    'csrf-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
        })
        .then( (result) => result.json)
        .then(data => {
            window.location.assign('/restaurants')
        })
    }
    function incrementQuantity(ele, x) {
        let itemName = ""
        itemName = ($(ele).parent().parent().find('#name').text())
        for( let i of cart.items) { 
            if( i.name === itemName) { 
                i.quantity = i.quantity + 1;
                $(ele).parent().find('.count').text(i.quantity);
                $(ele).parent().parent().find('#rate').text("₹"+(i.rate*i.quantity)+".00");
                total = total + i.rate;
                cart.total = total;
                $('.total .net').text("₹"+(total)+".00")
            }
        }
    }

    function decrementQuantity(ele, x) {
        let itemName = ($(ele).parent().parent().find('#name').text())
        let j = 0;
        for( let i of cart.items) { 
            if( i.name === itemName) { 
                i.quantity = i.quantity - 1;
                if( i.quantity == 0 ) {
                    cart.items.splice(j,1);
                    $(ele).parent().parent().remove();
                }
                $(ele).parent().find('.count').text(i.quantity);
                $(ele).parent().parent().find('#rate').text("₹"+(i.rate*i.quantity)+".00");
                total = total - i.rate;
                cart.total = total;
                $('.total .net').text("₹"+(total)+".00")
            }
            j++;
        }
    }