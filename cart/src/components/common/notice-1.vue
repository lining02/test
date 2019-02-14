<template>
    <div class="alerts">
        <div v-for="o in alerts" class="alert" :key="o.id">{{o.id}}-----{{o.context}}</div>
    </div>
</template>
<script>
export default {
    name: 'notice',
    data() {
        return {
            alerts: [],
        }
    },
    created() {
        this.id = 0
    },
    methods: {
        add({context='', time = 3}) {
            this.alerts.push({context, time,id: this.id++})
            let self = this
            setTimeout(function() {
                self.del(self.id)
            }, time*1000)
        },
        del(id) {
            this.alerts.find((o,i) => {
                this.alerts.splice(i, 1)
                return o.id = id
            })
        }
    }
}
</script>
<style lang="less">
    .alerts {
        position: fixed;
        top: 40px;
        left: 50%;
        transform: translate(0, -50%);
        .alert{
            background: rgba(0,0,0,0.4);
            color: #fff;
            z-index: 999;
        }
    }
</style>