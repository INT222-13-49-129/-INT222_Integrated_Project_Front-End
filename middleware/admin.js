export default function ({ store, redirect }) {
    if (store.state.auth.user.status !== 'ADMIN') {
      return redirect('/404')
    }
  }