document.addEventListener('DOMContentLoaded', () => {
    // 收藏按鈕
    const favoriteButtons = document.getElementsByClassName('btnFavorite');
    Array.from(favoriteButtons).forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('favorited');
            if (button.classList.contains('favorited')) {
                button.innerHTML = `<i class="fa fa-heart" style="font-size:1rem;color:red;"></i>`;
            } else {
                button.innerHTML = '<i class="fa fa-heart-o"></i>';
            }
        });
    });
});

$(document).ready(function () {
    // 品牌特價區拖曳功能
    const container = document.querySelector('.saleContainer');

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        container.scrollLeft = scrollLeft - walk;
    });
    // const ps = new PerfectScrollbar(container);

    // 收藏按鈕


    // $('.pImage button').on("click", function () {
    //     console.log(this)
    //     console.log($(this).html());
    //     $(this).classList.toggle("favorited");
    //     if ($(this).classList.contains('favorited')) {
    //         $(this).html(`<i class="fa fa-heart" style="font-size:1rem;color:red;"></i>`)
    //     } else {
    //         $(this).html('<i class="fa fa-heart-o"></i>')
    //     }
    // })
    $('.pNumberCtrl > button').on("mouseover", function () {
        // console.log(this);
        $(this).css('backgroundColor', 'rgb(4, 180, 69)')
    })
    $('.pNumberCtrl > button').on("mouseleave", function () {
        // console.log(this);
        $(this).css('backgroundColor', 'rgb(108, 218, 148)')
    })
    $('.plusNumber').on('click', function () {
        let num = $(this).prev().val();
        // console.log(num);
        // console.log($(this).prev().text());
        if (num == "") {
            num = 0;
            $(this).prev().val(parseInt(num) + 1);
        } else if (num < 1) {
            $(this).prev().val(parseInt(1));
        } else {
            $(this).prev().val(parseInt(num) + 1);
        }
    })
    $('.cutNumber').on('click', function () {
        let num = $(this).next().val();
        // console.log(num);
        // console.log($(this).next().text());
        if (num == "") {
            num = 1;
            $(this).next().val(parseInt(num) - 1);
        } else if (num <= 1) {
            $(this).next().val(parseInt(1));
        } else {
            $(this).next().val(parseInt(num) - 1);
        }
    })

    $('.pNumberCtrl > button').on('click', function () {
        // console.log($(this).parent().parent().parent());
        let pCard = $(this).parent().parent().parent();
        let pImage = pCard[0].children[0].children[0];
        let pName = pCard[0].children[1].innerText;
        let pPrice = pCard[0].children[2].innerText;
        console.log(pCard);
        console.log(pImage);
        console.log(pName, pPrice);
        $('#cartDropdown').append(`${pImage.innerHTML}
                <p>${pName}</p><p>${pPrice}</p>
            `)
    })

    // 規格按鈕選擇事件
    const productCards = document.querySelectorAll('.pCard');

    productCards.forEach(card => {
        const buttons = card.querySelectorAll('.pSizeItem');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按鈕的選中狀態
                buttons.forEach(btn => btn.classList.remove('selected'));
                // 添加當前按鈕的選中狀態
                button.classList.add('selected');
            });
        });
    })
})



