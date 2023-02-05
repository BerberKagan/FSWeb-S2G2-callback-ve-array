const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
const final2014 = fifaData.filter(arama);

function arama(item) {
	return (item["Year"] === 2014 && item.Stage === "Final")
}

const final2014_v2 = fifaData.filter((item) => {
	return (item["Year"] === 2014 && item.Stage === "Final")
})

const final2014_v3 = fifaData.filter (item => (item["Year"] === 2014 && item.Stage === "Final"));

console.clear();

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
console.log(final2014_v3[0]["Home Team Name"]);
//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(final2014_v3[0]["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(final2014_v3[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(final2014_v3[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/
if (final2014_v3[0]["Home Team Goals"] > final2014_v3[0]["Away Team Goals"]) {
	console.log("Kazanan " + final2014_v3[0]["Home Team Name"])
} else {
	console.log("Kazanan " + final2014_v3[0]["Away Team Name"])
}



/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) { 
	let finaller = arr.filter ((item) => {
		return item.Stage === "Final";
	})
	return finaller;
}
console.log (Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array, callback) {
	const finaller = callback(array);
	const yillar = finaller.map (element => {
		return element.Year;
	})
	return yillar;
}
console.log (Yillar (fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data, callback) {
	const finaller = callback(data);
	let kazananlar = [];
	
	/* for (let i=0; i<finaller.length; i++) {
		if (finaller[i]["Home Team Goals"] < finaller[i]["Away Team Goals"]) {
			kazananlar.push (finaller[i]["Away Team Name"]);
		} else {
			kazananlar.push (finaller[i]["Home Team Name"]);
		}
	} */
	/* finaller.forEach(item => { 
		if (item ["Home Team Goals"] < item["Away Team Goals"]) {
			kazananlar.push (item["Away Team Name"]);
		} else {
			kazananlar.push (item["Home Team Name"]);
		}
	})
	return kazananlar; */
	
	kazananlar = finaller.map (item => {
		if (item ["Home Team Goals"] < item["Away Team Goals"]) {
			return (item["Away Team Name"]);
		} else {
			return (item["Home Team Name"]);
		}
	})
	return kazananlar;
}
console.log (Kazananlar(fifaData, Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, cb_finaller, cb_yillar, cb_kazananlar) {
	let arr = [];
	let yillar = cb_yillar (data, cb_finaller);
	let kazananlar = cb_kazananlar (data, cb_finaller);
	kazananlar.forEach ((item, i) => {
		arr.push (`${yillar[i]} yılında, ${item} dünya kupasını kazandı!`);
	})
	return arr;
}
console.log (YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(cb_finaller) {
	let toplamGol = cb_finaller.reduce ((toplamGolSayisi, item) => {
		return toplamGolSayisi + item["Home Team Goals"] + item["Away Team Goals"];},0)
	return (toplamGol / cb_finaller.length).toFixed(2);
} 
console.log(OrtalamaGolSayisi(Finaller(fifaData)));


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

let initials = [];

Finaller(fifaData).forEach(i=> {
  if (!initials.includes(i["Home Team Initials"])) {
    initials.push(i["Home Team Initials"]);
  }
  if (!initials.includes(i["Away Team Initials"])) {
    initials.push(i["Away Team Initials"])
  }
})

function UlkelerinKazanmaSayilari(data, initials) {
  let kazananTakimlar = {};
  initials.forEach(i=> {
    kazananTakimlar[i] = 0;
  })
  Finaller(data).forEach((i) => {
    if (i['Home Team Goals'] > i['Away Team Goals']) {
      kazananTakimlar[i['Home Team Initials']]++
    } else {
      kazananTakimlar[i['Away Team Initials']]++
    }
  })
  return kazananTakimlar;
}
console.log(UlkelerinKazanmaSayilari(fifaData, initials));



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data, initials) {
	let takimlar = {};
	initials.forEach((i) => {
		takimlar[i] = 0;
	})
	Finaller(data).forEach((i) => {
		takimlar[i["Home Team Name"]] += i["Home Team Goals"];
		takimlar[i["Away Team Name"]] += i["Away Team Goals"];
	})

	let enFazlaGol = 0; 
	let enFazlaGolAtan ="";

	for (let key in takimlar) {
		if(takimlar[key]>enFazlaGol) {
			enFazlaGol = takimlar[key];
			enFazlaGolAtan = key;
		}
	}
	return enFazlaGolAtan;
}
console.log(EnCokGolAtan(fifaData, initials));



/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data, initials) {
	let takimlar = {};
	initials.forEach((i) => {
		takimlar[i] = 0;
	})
	Finaller(data).forEach((i) => {
		takimlar[i["Home Team Name"]] += i["Home Team Goals"];
		takimlar[i["Away Team Name"]] += i["Away Team Goals"];
	})

	let enAzGol = 0; 
	let enAzGolAtan ="";

	for (let key in takimlar) {
		if(takimlar[key]<enAzGol) {
			enAzGol = takimlar[key];
			enAzGolAtan = key;
		}
	}
	return enAzGolAtan;
}
console.log(EnKotuDefans(fifaData, initials));




/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
