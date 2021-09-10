/* eslint-disable */
import React from "react";
import {ScrollView, View, Text, TouchableOpacity, Modal, Dimensions, Image} from "react-native";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Dash from "react-native-dash";
import {Spinner} from "native-base";
import moment from "moment";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";
import { Colors } from "react-native-paper";

const {Color, Res} = Resources;
const {width, height}= Dimensions.get('window');

class TermsConditionModal extends React.PureComponent{
 constructor(props){
   super(props);
   this.state = {
   }
 }


  render () {
    const {billspayment: {setInputDetails, submitPayment}, isTermsShowing, closeModal2} = this.props;
    return (
        <Modal
          ref={"TermsConditionModal"}
          visible={isTermsShowing}
          transparent
          onRequestClose={closeModal2}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View>
              <View style={{height: 60, width: width-30, backgroundColor: "black"}}>
                  <Text style={{marginLeft: 20, marginTop: 20, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, color: "white" }}>
                  Terms and Condition
                  </Text>
                </View>
                <View style={{height: height/2, padding: 10, width: width -30, backgroundColor: "white"}}>
                  <View style={{marginTop: 5, marginLeft: 10, flexDirection: "row", alignItems: "center"}}>
                    <Image 
                      style={{height: 60, width: 60}}
                      source={Res.get('ups')}
                      />
                      <View>
                        <Text style={{marginLeft: 10, fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 20, color: "black" }}>
                         Unified Products and Services
                        </Text>
                        <Text style={{marginLeft: 10, fontFamily: "Roboto-Light", fontSize: 17, color: "black" }}>
                         Terms and Conditions
                        </Text>
                      </View>
                  </View>
                  <ScrollView style={{marginTop: 10, marginLeft: 10, }}>
                    <Text>
                    Nullam putent singulis eos an, ius fugit civibus voluptua at. Quo eu accumsan petentium conclusionemque. 
                    Verterem dissentiet ex vis, vel autem expetenda eu. Te vix duis habeo quaeque, nobis commune accusata vix eu. 
                    Pro nemore copiosae ut. At eam eros nonumes evertitur. Vim ad possit perfecto, cu modo quot veniam his, 
                    cu falli doming suscipit cum. An vix elit modus oporteat, vivendum tacimates pri ex. Eum eu persius alienum. 
                    Per ubique accusam petentium ut, ea pri posse vitae eligendi. Nam ad ferri doming integre. 
                    Ad eam ipsum legimus posidonium, pro ex quot diceret reformidans, eu vim simul impetus. Ei quem inermis adolescens cum. 
                    Eam ne cibo ancillae reformidans, et sit facilis hendrerit. Ex est sanctus volumus, nec verear suscipit ad, 
                    sea inermis singulis inimicus ea. Ex nec virtute aliquid, mea legere semper ut. Soleat delenit qui id. 
                    Eum id modus vidisse dolorum. Ad alia ocurreret quaerendum nec, sonet placerat dissentiunt ea vix. 
                    Mundi mnesarchum quo id. Usu at sale malorum. Ea nullam lucilius legendos pro. Pri te dolore vocibus, 
                    intellegebat comprehensam mea ex. Et rationibus expetendis mediocritatem eos, vix te posse dicat tacimates, 
                    alterum intellegebat voluptatibus mei no. Eum cu vide euripidis moderatius. Ad cum veritus consequuntur, 
                    sadipscing cotidieque qui ne. Putant latine gubergren ea pri, no option debitis vim, ea duis fierent epicurei usu. 
                    Debet convenire vis ea, id mea reprimique instructior, vix alii adhuc incorrupte ut. Luptatum forensibus mei eu. 
                    Et summo debet dicunt mea, evertitur vulputate reformidans his id. Timeam commune ei vim, an sed alterum postulant 
                    gloriatur. Nam dictas aliquam recusabo ex, sit eu ignota inermis nominavi. Vix quod convenire posidonium te, 
                    mea affert nostro audiam ne, pri homero electram suscipiantur eu. Et quando eligendi mei, est nihil animal adipisci ne. 
                    Nec gloriatur tincidunt at. Et his timeam vidisse, zril temporibus te vix. Eum animal dolores et. 
                    Eos in autem feugait albucius, sea bonorum legimus vituperata at. Vis congue antiopam urbanitas no. 
                    Paulo invidunt eu his, vel ridens graeci accusata id. Primis possit his ne, eu duo oblique aliquam. 
                    Tincidunt definitiones per at. His dolor fabulas offendit ex, scripta placerat ei nam. Eos eu senserit scribentur 
                    reformidans. Sit suscipiantur definitionem ad, te sed decore fabulas omnesque, nonumes dolores adolescens nam ad. 
                    Brute audiam noluisse ad sit, ex copiosae facilisis persequeris eam. Mei nulla admodum expetendis te, 
                    veniam inermis ut sea. Ad eam nostrud delicata intellegam, labitur intellegam an vel, id probo appellantur mea. 
                    Cu vis prima accusamus deterruisset. Ea movet scaevola assentior ius.
                    </Text>
                  </ScrollView>
                </View>
                <View style={{width: width-30, backgroundColor: Color.bg, paddingVertical: 10}}>
                  <TouchableOpacity style={{bottom: 0, alignSelf: "center", borderRadius: 5, 
                    borderBottomColor: Color.colorPrimaryDark, alignItems: "center", justifyContent: "flex-end", 
                    backgroundColor: Color.colorPrimary, paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 5 }}
                    onPress={closeModal2}>
                        <Text style={{fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 14, color: "white"}}> I Agree </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
    )
  }
} 


export default TermsConditionModal;