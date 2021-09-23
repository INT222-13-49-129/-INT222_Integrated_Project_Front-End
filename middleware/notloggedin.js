export default function ({ store }) {
    if (store.state.auth.loggedIn) {
      this.$router.replace('/user')
    }
}