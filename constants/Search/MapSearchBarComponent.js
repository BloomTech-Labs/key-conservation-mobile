export default {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 1,
    paddingLeft: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  outterContainer:{
    backgroundColor:"#F2F2FB"
  },
  searchContainer: {
    width:'100%',
    backgroundColor: "white",
    borderRadius: 0,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  searchInputContainer: {
    alignItems:"center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    height: 45,
    width: "100%",
    position:"relative",
  },
  selectionRow: {
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "700",
    paddingTop: 0,
    alignSelf: "stretch",
    display: "none",
    padding:6,
  },
  searchInput: {
    flex: 1,
    padding: "3%",
    color: "#2B3036",
    backgroundColor: "#F5F5F5",
    fontSize: 16,
    height: 50,
    fontWeight: "500",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingLeft:50,
  },
  
  dropDownArrowButton: {
    right: 10,
    height:'100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight:20,
    position:'absolute',
    top:0,
    alignSelf:'center',
    width: 50,
    backgroundColor: "transparent",
    marginLeft: 2,
  },

  filterSelectOption: {
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height:44,
    borderRadius: 6,
    paddingLeft:10,
    marginTop:6
  },
  
  filterOption: {
    color: "#444",
    fontFamily: 'Futura-Medium',
    fontSize: 18
  },

  clearButton: {
    right: 40,
    height:'100%',
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
    paddingRight:20,
    position:'absolute',
    top:0,
    alignSelf:'center',
  },
  
  searchButton:{
    left:0,
    height:'100%',
    alignItems: "center",
    justifyContent: "center",
    paddingRight:20,
    position:'absolute',
    top:0,
    alignSelf:'center',
    width: 50,
    backgroundColor: "transparent",
  },
  
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
    position:"absolute",
    left:16,
    top:8.75,
  },
  
  keyInput: {
    padding: "5%",
    backgroundColor: "yellow",
    fontSize: 20
  },
  messageContainer: {
    marginTop:6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#323338",
    height:44,
    borderRadius: 6,
  },

  messageText: {
    color: "white",
    fontFamily: 'Futura-Medium',
    fontSize: 18
  },
  show: {
    display: "flex"
  },
  hide: {
    display: "none"
  }
};
