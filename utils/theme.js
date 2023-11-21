import {createTheme} from '@rneui/themed';

export const COLORS = {
  primary: '#435c70',
  secondary: '#f5a623',
  fontColor: 'white',
  highLighter: 'red',
  backgroundColor:'#4e657a'
};

const buttonStyle=(type)=>{
if(type==='outline'){
return{color:COLORS.secondary,bgColor:COLORS.primary,fontSize:18}
}
else if(type==='clear'){
  return{color:COLORS.secondary,bgColor:'transparent',fontSize:12}
}
else{
return {color:COLORS.fontColor,bgColor:COLORS.secondary,fontSize:18}
}
}
export const theme = createTheme({
  components: {
    Text: (props, theme) => ({
      style: {
        color: COLORS.fontColor,       
      }
    
    }),
    Button: (props, theme) => ({
      uppercase: true,
      titleStyle: {
        color:buttonStyle(props.type).color,
        fontWeight:100,
        fontSize:buttonStyle(props.type).fontSize,
        
      },
      buttonStyle:{
        borderColor:buttonStyle(props.type).color,
        backgroundColor:buttonStyle(props.type).bgColor,
      
      }
    }),
  },
});
