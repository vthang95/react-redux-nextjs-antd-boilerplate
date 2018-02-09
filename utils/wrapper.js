import connect from "store"
import bigdaddy from "hocs/bigdaddy"

exports.pageWrapper = (mapStateToProps, mapDispatchToProps) => {
  return page => connect(mapStateToProps, mapDispatchToProps)(bigdaddy(page))
}