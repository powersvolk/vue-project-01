export default{
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    },
    mounted() {
        
    },
}