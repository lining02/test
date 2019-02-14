import KNotice from '@/components/common/notice.vue'

KNotice.getIntece = function() {
    const nn = new Vue({
        render: h => h(KNotice)
    }).$mount()
    document.body.appendChild(instance.$el);
console.log(nn.$el)
}

let aa= null
