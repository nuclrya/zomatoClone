const cart  = []; 

function addToCart(ele) { 
    cart.push($(ele).parent().parent().find('.info h3').text())
}