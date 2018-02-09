import connect from "store"
import bigdaddy from "hocs/bigdaddy"

const pageWrapper = (mapStateToProps, mapDispatchToProps) => {
  return page => connect(mapStateToProps, mapDispatchToProps)(bigdaddy(page))
}

export {
  pageWrapper
}