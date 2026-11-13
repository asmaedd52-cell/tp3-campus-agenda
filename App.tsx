import { View,Text, StyleSheet,FlatList } from "react-native";


const evenements=[
{id: 'E01',Titre:"Atelier React",Catégorie:"Atelier",Capacité:25 , Inscrits:25},
{id: 'E02',Titre:"Conférence IA",Catégorie:"Conférence",Capacité:70 , Inscrits:52},
{id: 'E03',Titre:"Sécurité mobile",Catégorie:"Atelier",Capacité:20 , Inscrits:17},
{id: 'E04',Titre:"Design UI",Catégorie:"Atelier",Capacité:18 , Inscrits:9},
{id: 'E05',Titre:"Forum projets",Catégorie:"Rencontre",Capacité:50 , Inscrits:49},
{id: 'E06',Titre:"Découverte Git",Catégorie:"Atelier",Capacité:24 , Inscrits:24},
];


type Evenement ={
  id : string;
  Titre : string;
  Catégorie : string;
  Capacité : number;
  Inscrits :number;
};


function placesRestantes(e:Evenement){
  if(e.Capacité - e.Inscrits>0){
    return e.Capacité - e.Inscrits;
  }else{
    return 0;
  }
} 



function StatutEvenement(e:Evenement){
  let r=placesRestantes(e);
  if(r===0){
    return "Complet";
  }else if(r>=1 && r<=3){
    return "Presque complet";
  }else{
    return "Ouvert";
  }
}

console.log(evenements.length);

const Complet =evenements.filter((e)=>e.Capacité-e.Inscrits===0);
console.log(Complet.length);


const Places=evenements.filter((e)=>e.Capacité -e.Inscrits>0);
console.log(Places.length);


const sommePlacesRestantes=Places.reduce((somme,e)=>somme + e.Capacité-e.Inscrits,0);



const EcorePlaces=evenements.filter((e)=>e.Catégorie==="Atelier" && e.Capacité - e.Inscrits>0);
console.log(EcorePlaces.length);




type BadgeEtatProps={
  statut:string;
};

function BadgeEtat({statut}:BadgeEtatProps){
  let couleur=styles.ouvert;

  if(statut==="Complet"){
    couleur=styles.complet;
  }else if(statut==="Presque complet"){
    couleur=styles.presquecomplet;
  }
  return(
    <View style={[styles.badge ,couleur]}>
    <Text>{statut}</Text>
    </View>

  );
}



type CarteEvenementProps={
  e:Evenement;
};

function CarteEvenement({e}:CarteEvenementProps){
  return(
  <View style={styles.carte}><Text>{e.Titre}</Text>
  <Text style={styles.titreCarte}>{e.Catégorie}</Text>
  <Text>{placesRestantes(e)}</Text>
  <BadgeEtat statut={StatutEvenement(e)}/>
  </View>
  )
};

type BlocStatiqueProps={
  libellé:string;
  a: number;
};
function BlocStatique({libellé,a}:BlocStatiqueProps){
  return(
    <View style={styles.bloc}>
      <Text style={styles.libelle}>{libellé} </Text>
      <Text style={styles.nombre}>{a}</Text>
    </View>
  );
}

const mode="tous";

const listeAffichee = mode === "tous"
  ? evenements : EcorePlaces;


export default function App(){
  return(
  <View style={styles.page}>
    <View style={styles.entete}><Text style={styles.titre}>Campus Agenda</Text></View>
  <Text style={styles.sousTitre}>Evénements du Campus</Text>
   
  <View style={styles.statistiques}>
    <BlocStatique libellé="évenements au total" a={evenements.length}/>
    <BlocStatique libellé="événements complets" a={Complet.length}/>
    <BlocStatique libellé="événements avec places" a={Places.length}/>
    <BlocStatique libellé="Places restantes" a={sommePlacesRestantes}/> 
  </View>

  <Text style={styles.titreListe}>{mode === "tous"? "Tous les evenements":"Ateliers disponibles"}</Text>
 <FlatList data={listeAffichee} renderItem={({item})=> <CarteEvenement e={item}/>}
 keyExtractor={(item)=>item.id}
 ListEmptyComponent={<Text style={styles.messageVide}> aucun événement disponible</Text>}/>
  </View> 
      
  );
}


const styles=StyleSheet.create ({
  page:{flex:1,backgroundColor:'#F2F7FD',paddingTop:50,paddingHorizontal:18},
  entete:{marginBottom:20},
  titre:{fontSize:26,fontWeight:'bold',color:'#173B63'},
  sousTitre:{fontSize:15,color:'#64748B',marginTop:5},
  statistiques:{flexDirection:'row',flexWrap:"wrap",justifyContent:"space-between",marginBottom:20},
  bloc:{backgroundColor:'white',padding:14,borderRadius:12,
    marginBottom:10},
  libelle:{fontSize:12,color:'#64748B'},
  nombre:{fontSize:22,fontWeight:'bold',color:'#173B63',marginTop:5},
   titreListe:{fontSize:19,fontWeight:'bold',marginBottom:12,color:'#173B63'},
  carte:{backgroundColor:'white',padding:16,borderRadius:12,marginBottom:12},
  titreCarte:{fontSize:17,fontWeight:'bold',marginBottom:6,color:'#173B63'},
  badge:{padding:7,borderRadius:8,marginTop:8},
  texteBadge:{fontSize:12,fontWeight:'bold'},
  ouvert: {backgroundColor: "#C8E6C9"},
  complet:{backgroundColor: "#FFCCCC"},
  presquecomplet:{backgroundColor: "#FFE0B2"},
  messageVide:{textAlign:'center',padding:20,color:'#64748D'},
});