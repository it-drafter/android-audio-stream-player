import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    srp: {
      translation: {
        app_player: 'Player',
        app_about_us: 'O nama',
        app_settings: 'Podešavanja',
        //
        // about_us_support_title_part_1:
        // 'NAŠ RAD U POTPUNOSTI ZAVISI OD VAŠIH DONACIJA.',
        // about_us_support_title_part_2: 'MOŽEŠ NAS PODRŽATI NA SLEDEĆE NAČINE:',
        // about_us_support_part_1:
        //   'STALNOM MESEČNOM ILI GODIŠNJOM DONACIJOM NA PATREONU:',
        // about_us_support_part_2: 'PAYPALOM:',
        // about_us_support_part_3: 'UPLATOM NA NAŠ RAČUN U OTP BANCI:',
        about_us_social_networks_title: 'ZAPRATI NAS',
        about_us_shows_title_part_1: 'RASPORED EMISIJA',
        about_us_shows_title_part_2: 'NA RADIJU',
        about_us_shows_part_1: 'Radnim danima (sem petka), 07h:',
        about_us_shows_part_2: 'Alarm sa Mlađom i Daškom',
        about_us_shows_part_3: 'Radnim danima, 11h:',
        about_us_shows_part_4: 'Provizorni podnevni program by Ivan Varnju',
        about_us_shows_part_5: 'Ponedeljak, 20h:',
        about_us_shows_part_6: 'Sportski pozdrav',
        about_us_shows_part_7: 'Utorak, 20h:',
        about_us_shows_part_8: 'Večernja škola rokenrola',
        about_us_shows_part_9: 'Sreda, 20h:',
        about_us_shows_part_10: 'Ljudi iz podzemlja',
        about_us_shows_part_11: 'Četvrtak, 20h:',
        about_us_shows_part_12: 'Na ivici ofsajda',

        about_us_story_title: 'NAŠA TOPLA LJUCKA PRIČA',
        about_us_story_part_1:
          'Sve je počelo kada je Mlađa, tezgareći kao Deda Mraz, Dašku doneo paketić za Novu 1987. u firmi gde su radili Daškovi mama i tata.',
        about_us_story_part_2:
          'Baš smo skoro nešto računali i mislimo da se poznajemo negde oko 20 godina. Stari drugari sa pank scene.',
        about_us_story_part_3:
          'Svirali u bendovima, pravili fanzine, radio emisije, ozbiljne časopise, organizovali koncerte i žurke.',
        about_us_story_part_4:
          'Ponovo se našli na zajedničkom radio poslu u rano proleće 2011. i otad se skoro svako jutro gledamo i slušamo.',
        about_us_story_part_5:
          'Pored radio pregalaštva, prilično redovno se penjemo na bine i tamo se uživo šalimo, pevamo i blamiramo.',
        //
        control_center_error_title: 'Ne mogu da pustim podkast',
        control_center_error_check_internet: 'Proveri internet konekciju.',
        control_center_error_wifi_only:
          'U podešavanjima ove aplikacije je uključena opcija "Slušaj online podkast samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje podkasta i preko mobilnog interneta.',
        //
        episode_play_error_title: 'Ne mogu da downloadujem podkast.',
        episode_play_error_check_internet: 'Proveri internet konekciju.',
        episode_play_error_wifi_only_dl:
          'U podešavanjima ove aplikacije je uključena opcija "Downloaduj podkaste samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš download-ovanje podkasta i preko mobilnog interneta.',
        day: 'dan',
        days: 'dana',
        days_ago: 'pre',

        monday: 'Ponedeljak',
        tuesday: 'Utorak',
        wednesday: 'Sreda',
        thursday: 'Četvrtak',
        friday: 'Petak',
        saturday: 'Subota',
        sunday: 'Nedelja',

        january: 'januar',
        february: 'februar',
        march: 'mart',
        april: 'april',
        may: 'maj',
        june: 'jun',
        july: 'jul',
        august: 'avgust',
        september: 'septembar',
        october: 'oktobar',
        november: 'novembar',
        december: 'decembar',

        episode_play_cancel_download: 'Otkaži download',
        episode_play_delete_podcast: 'Obriši podkast iz memorije',
        episode_play_download: 'Preuzmi za offline preslušavanje',

        //
        main_live_radio: 'Live Radio',
        main_podcast: 'Podkast',
        //
        podcast_back_to_list: 'Nazad na podkast listu',
        //
        podcast_list_podcast_list: 'Podkast lista',
        podcast_list_swipe_down: 'Povuci dole za update / refresh',
        podcast_list_error_title: 'Ne mogu da ažuriram podkast listu.',
        podcast_list_error_check_internet: 'Proveri internet konekciju.',
        podcast_list_error_server:
          'Lista nije ažurirana. Greška u konekciji sa serverom.',
        podcast_list_update_success: 'Lista je uspešno ažurirana!',
        podcast_list_filter_alarm_music: 'Alarm - sa muzikom',
        podcast_list_filter_alarm_no_music: 'Alarm - bez muzike',
        podcast_list_filter_ppp: 'PPP - Ivan Varnju',
        podcast_list_filter_school: 'Večernja škola rokenrola',
        podcast_list_filter_emigration: 'Unutrašnja emigracija',
        podcast_list_filter_underground: 'Ljudi iz podzemlja',
        podcast_list_filter_sports: 'Sportski pozdrav',
        podcast_list_filter_stories: 'Tople ljucke priče',
        podcast_list_filter_disruption: 'Rastrojavanje',
        podcast_list_filter_offside: 'Na ivici ofsajda',
        //
        settings_settings: 'Podešavanja',
        settings_wifi_live_radio: 'Slušaj live radio samo preko WiFi',
        settings_wifi_podcasts: 'Slušaj online podkast samo preko WiFi',
        settings_wifi_podcasts_download: 'Downloaduj podkaste samo preko WiFi',
        settings_delete_all: 'Obriši sve preuzete podkaste',
        settings_number_of_downloaded: 'Broj preuzetih podkasta:',
        settings_total_size: 'Ukupna veličina:',
        settings_exit_app: 'Izlaz iz aplikacije',
        settings_color: 'Boja:',
        settings_app_language: 'Jezik aplikacije:',
        settings_translators: 'Prevodioci:',
        settings_about_app: 'O aplikaciji:',
        settings_version: 'Verzija:',
        settings_author: 'Autor: ',
        settings_contact: 'Kontakt:   ',
        // settings_buy_me_a_coffee: 'Časti aplikatora:',
        // settings_paypal: '- PayPal-om:  ',
        // settings_bank_account_rsd: '- Uplatom na dinarski račun:  ',
        // settings_bitcoin: '- Bitcoin-om:  ',
        // settings_btc_network: 'BTC Network',
        // settings_lightning_network: 'Lightning Network',
        settings_copied: 'Kopirano!',
        settings_wifi_info_title: 'Info',
        settings_wifi_live_radio_info:
          'Isključivanjem ove opcije dozvoljavaš slušanje live radija i preko mobilnog interneta.',
        settings_wifi_podcast_info:
          'Isključivanjem ove opcije dozvoljavaš slušanje podkasta i preko mobilnog interneta.',
        settings_wifi_podcast_download_info:
          'Isključivanjem ove opcije dozvoljavaš download podkasta i preko mobilnog interneta.',
        settings_unsupported_features_title: 'Nepodržane opcije',
        settings_unsupported_features_message:
          'Vaša verzija Androida ne podržava operacije sa podkastima.',
        //
        stream_count_listeners: 'Online slušalaca:',
        stream_count_unavailable: 'nedostupno',
        stream_error_title: 'Ne mogu da pustim radio.',
        stream_error_check_internet: 'Proveri internet konekciju.',
        stream_error_wifi_only:
          'U podešavanjima ove aplikacije je uključena opcija "Slušaj live radio samo preko WiFi.\n\nIsključi tu opciju ako želiš da dozvoliš slušanje radija i preko mobilnog interneta.',
        stream_unsupported_feature_title: 'Nepodržana opcija',
        stream_unsupported_feature_message:
          'Vaša verzija Androida ne podržava Stream 1.',
      },
    },
    hrv: {
      translation: {
        app_player: 'Player',
        app_about_us: 'Općenito',
        app_settings: 'Postavke',
        //
        // about_us_support_title_part_1:
        //   'NAŠ RAD U POTPUNOSTI OVISI O VAŠIM DONACIJAMA.',
        // about_us_support_title_part_2: 'MOŽEŠ NAS PODRŽATI NA SLJEDEĆE NAČINE:',
        // about_us_support_part_1:
        //   'REDOVITOM MJESEČNOM/GODIŠNJOM DONACIJOM (PATREONA):',
        // about_us_support_part_2: 'PAYPAL DONACIJE:',
        // about_us_support_part_3: 'UPLATA NA OTP ŽIRO:',
        about_us_social_networks_title: 'ZAPRATI NAS ONLINE',
        about_us_shows_title_part_1: 'RASPORED EMITIRANJA EMISIJA',
        about_us_shows_title_part_2: 'NA RADIO VALOVIMA',
        about_us_shows_part_1: 'Radnim danima (osim petka), 07h:',
        about_us_shows_part_2: 'Alarm s Mlađom i Daškom',
        about_us_shows_part_3: 'Radnim danima, 11h:',
        about_us_shows_part_4: 'Privremeni podnevnik (Ivan Varnju)',
        about_us_shows_part_5: 'Ponedjeljak, 20h:',
        about_us_shows_part_6: 'Sportski pozdrav',
        about_us_shows_part_7: 'Utorak, 20h:',
        about_us_shows_part_8: "Večernja škola rock'n'rolla",
        about_us_shows_part_9: 'Srijeda, 20h:',
        about_us_shows_part_10: 'Ljudi iz podzemlja',
        about_us_shows_part_11: 'Četvrtak, 20h:',
        about_us_shows_part_12: 'Na rubu zaleđa',

        about_us_story_title: 'NAŠA TOPLA LJUDSKA PRIČA',
        about_us_story_part_1:
          'Sve je počelo kad je Mlađa (u ulozi Djed Mraza) Dašku donio novogodišnji paketić 1987. u tvrtki gdje su radili njegovi stari.',
        about_us_story_part_2:
          'Nedavno smo skužili da se poznajemo već 20+ godina. Stara škvadra s punk scene.',
        about_us_story_part_3:
          'Sviralo se po bendovima, izdavali fanzine, vodili emisije, organizirali koncerte i partije.',
        about_us_story_part_4:
          'Ponovno smo se našli na radiju u proljeće 2011. - i od tada se gotovo svaki jutar čujemo i vidimo.',
        about_us_story_part_5:
          'Osim radija, redovito nastupamo izravno: šalimo se, pjevamo i izvodimo gluposti.',
        //
        control_center_error_title: 'Ne mogu reproducirati podcast',
        control_center_error_check_internet: 'Provjeri internetsku vezu.',
        control_center_error_wifi_only:
          'U postavkama sučelja ovog appa aktivirana je opcija "Slušaj radio izravno samo preko WiFi-ja".\n\nIsključi je ako hoćeš slušati i preko podatkovne usluge na mobitelu.',
        //
        episode_play_error_title: 'Greška pri preuzimanju',
        episode_play_error_check_internet: 'Provjeri internetsku vezu.',
        episode_play_error_wifi_only_dl:
          'Postavke sučelja ograničavaju preuzimanje na WiFi. U ovom appu aktivirana je opcija "Skidaj podcaste samo na WiFi-ju".\n\nIsključi je ako hoćeš slušati i preko podatkovne usluge na mobitelu.',
        day: 'dan',
        days: 'dana',
        days_ago: 'prije',

        monday: 'Ponedjeljak',
        tuesday: 'Utorak',
        wednesday: 'Srijeda',
        thursday: 'Četvrtak',
        friday: 'Petak',
        saturday: 'Subota',
        sunday: 'Nedjelja',

        january: 'siječanj',
        february: 'veljača',
        march: 'ožujak',
        april: 'travanj',
        may: 'svibanj',
        june: 'lipanj',
        july: 'srpanj',
        august: 'kolovoz',
        september: 'rujan',
        october: 'listopad',
        november: 'studeni',
        december: 'prosinac',

        episode_play_cancel_download: 'Prekini preuzimanje',
        episode_play_delete_podcast: 'Ukloni podcast s uređaja',
        episode_play_download: 'Preuzmi za slušanje offline',

        //
        main_live_radio: 'Formatizirani radio izravno (by Domagoj Mislav)',
        main_podcast: 'Podcasti',
        //
        podcast_back_to_list: 'Povratak na popis',
        //
        podcast_list_podcast_list: 'Biblioteka podcasta',
        podcast_list_swipe_down: 'Povuci dolje za osvježavanje',
        podcast_list_error_title: 'Ažuriranje nije uspjelo',
        podcast_list_error_check_internet: 'Provjeri internetsku vezu.',
        podcast_list_error_server: 'Server nije dostupan. Pokušaj kasnije.',
        podcast_list_update_success: 'Podcasti su ažurirani!',
        podcast_list_filter_alarm_music: 'Alarm (s glazbom)',
        podcast_list_filter_alarm_no_music: 'Alarm (samo razgovor)',
        podcast_list_filter_ppp: 'PPP - Ivan Varnju',
        podcast_list_filter_school: "Večernja škola rock'n'rolla",
        podcast_list_filter_emigration: 'Unutarnja emigracija',
        podcast_list_filter_underground: 'Ljudi iz podzemlja',
        podcast_list_filter_sports: 'Sportski pozdrav',
        podcast_list_filter_stories: 'Tople priče',
        podcast_list_filter_disruption: 'Rastrojavanje',
        podcast_list_filter_offside: 'Na rubu zaleđa',
        //
        settings_settings: 'Postavke',
        settings_wifi_live_radio: 'Slušaj radio izravno samo preko WiFi-ja',
        settings_wifi_podcasts: 'Slušaj podcaste online samo preko WiFi-ja',
        settings_wifi_podcasts_download: 'Skidaj podcaste samo na WiFi-ju',
        settings_delete_all: 'Pobriši sve skinute podcaste',
        settings_number_of_downloaded: 'Broj skinutih podcasta:',
        settings_total_size: 'Ukupna veličina:',
        settings_exit_app: 'Izađi iz appa',
        settings_color: 'Boja:',
        settings_app_language: 'Jezik appa:',
        settings_translators: 'Prevoditelji:',
        settings_about_app: 'O appu:',
        settings_version: 'Verzija:',
        settings_author: 'Autor: ',
        settings_contact: 'Kontakt:   ',
        // settings_buy_me_a_coffee: 'Časti autora kavom:',
        // settings_paypal: '- Preko PayPala:  ',
        // settings_bank_account_rsd: '- Uplata na dinarski račun:  ',
        // settings_bitcoin: '- Preko Bitcoina:  ',
        // settings_btc_network: 'BTC mreža',
        // settings_lightning_network: 'Lightning mreža',
        settings_copied: 'Iskopirano!',
        settings_wifi_info_title: 'Info',
        settings_wifi_live_radio_info:
          'Isključivanjem ove opcije omogućuješ slušanje radija izravno i preko podatkovne usluge na mobitelu.',
        settings_wifi_podcast_info:
          'Isključivanjem ove opcije omogućuješ slušanje podcasta i preko podatkovne usluge na mobitelu.',
        settings_wifi_podcast_download_info:
          'Isključivanjem ove opcije omogućuješ skidanje podcasta i preko podatkovne usluge na mobitelu.',
        settings_unsupported_features_title: 'Nepodržane opcije',
        settings_unsupported_features_message:
          'Vaša verzija Androida ne podržava operacije sa podkastima.',
        //
        stream_count_listeners: 'Ljudi online:',
        stream_count_unavailable: 'nije dostupno',
        stream_error_title: 'Ne mogu reproducirati radio.',
        stream_error_check_internet: 'Provjeri internetsku vezu.',
        stream_error_wifi_only:
          'U postavkama ovog appa ti je uključeno "Slušaj radio izravno samo preko WiFi-ja".\n\nIsključi to ako hoćeš slušati i preko podatkovne usluge na mobitelu.',
        stream_unsupported_feature_title: 'Nepodržana opcija',
        stream_unsupported_feature_message:
          'Vaša verzija Androida ne podržava Stream 1.',
      },
    },
    mkd: {
      translation: {
        app_player: 'Плеер',
        app_about_us: 'За нас',
        app_settings: 'Поставки',
        //
        // about_us_support_title_part_1:
        //   'НАШАТА РАБОТА ЦЕЛОСНО ЗАВИСИ ОД ВАШИТЕ ДОНАЦИИ.',
        // about_us_support_title_part_2:
        //   'МОЖЕТЕ ДА НÈ ПОДДРЖИТЕ НА СЛЕДНИТЕ НАЧИНИ:',
        // about_us_support_part_1:
        //   'СО РЕДОВНА МЕСЕЧНА ИЛИ ГОДИШНА ДОНАЦИЈА НА PATREON:',
        // about_us_support_part_2: 'ПРЕКУ PAYPAL:',
        // about_us_support_part_3: 'УПЛАТА НА НАШАТА СМЕТКА ВО OTP БАНКА:',
        about_us_social_networks_title: 'СЛЕДЕТЕ НÈ',
        about_us_shows_title_part_1: 'РАСПОРЕД НА ЕМИСИИ',
        about_us_shows_title_part_2: 'НА РАДИОТО',
        about_us_shows_part_1: 'Работни денови (освен петок), 07ч:',
        about_us_shows_part_2: 'Аларм со Млаѓa и Дашко',
        about_us_shows_part_3: 'Работни денови, 11ч:',
        about_us_shows_part_4: 'Провизорна пладневна програма by Иван Варњу',
        about_us_shows_part_5: 'Понеделник, 20ч:',
        about_us_shows_part_6: 'Спортски поздрав',
        about_us_shows_part_7: 'Вторник, 20ч:',
        about_us_shows_part_8: 'Вечерна школа на рокенрол',
        about_us_shows_part_9: 'Среда, 20ч:',
        about_us_shows_part_10: 'Луѓе од подземјето',
        about_us_shows_part_11: 'Четврток, 20ч:',
        about_us_shows_part_12: 'На работ од офсајд',

        about_us_story_title: 'НАШАТА ТОПЛА ЧОВЕЧКА ПРИКАЗНА',
        about_us_story_part_1:
          'Сѐ започна кога Млаѓa, работејќи како Дедо Мраз, му донесе пакетче на Дашко за Нова 1987 година во фирмата каде што работеа мама и тато на Дашко.',
        about_us_story_part_2:
          'Скоро пресметувавме и мислиме дека се познаваме околу 20 години. Стари другари од панк сцената.',
        about_us_story_part_3:
          'Свиревме во бендови, правевме фанзини, радио емисии, сериозни списанија, организиравме концерти и журки.',
        about_us_story_part_4:
          'Повторно се најдовме во заедничка радио емисија во рана пролет 2011 година и оттогаш речиси секое утро се гледаме и слушаме.',
        about_us_story_part_5:
          'Освен радио ангажманот, редовно се качуваме на бина и таму во живо се шегуваме, пееме и се бламираме.',
        //
        control_center_error_title: 'Не можам да пуштам подкаст',
        control_center_error_check_internet: 'Провери интернет конекција.',
        control_center_error_wifi_only:
          'Во поставките на оваа апликација е вклучена опцијата „Слушај онлајн подкаст само преку Wi-Fi“.\n\nИсклучи ја оваа опција ако сакаш да дозволиш слушање подкасти и преку мобилен интернет.',
        //
        episode_play_error_title: 'Не можам да симнам подкаст.',
        episode_play_error_check_internet: 'Провери интернет конекција.',
        episode_play_error_wifi_only_dl:
          'Во поставките на оваа апликација е вклучена опцијата „Симни подкасти само преку Wi-Fi“.\n\nИсклучи ја оваа опција ако сакаш да дозволиш симнување подкасти и преку мобилен интернет.',
        day: 'ден',
        days: 'дена',
        days_ago: 'пред',

        monday: 'Понеделник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четврток',
        friday: 'Петок',
        saturday: 'Сабота',
        sunday: 'Недела',

        january: 'јануари',
        february: 'февруари',
        march: 'март',
        april: 'април',
        may: 'мај',
        june: 'јуни',
        july: 'јули',
        august: 'август',
        september: 'септември',
        october: 'октомври',
        november: 'ноември',
        december: 'декември',

        episode_play_cancel_download: 'Откажи симнување',
        episode_play_delete_podcast: 'Избриши подкаст од меморија',
        episode_play_download: 'Симни за офлајн слушање',

        //
        main_live_radio: 'Радио во живо',
        main_podcast: 'Подкаст',
        //
        podcast_back_to_list: 'Назад на листата со подкасти',
        //
        podcast_list_podcast_list: 'Листа на подкасти',
        podcast_list_swipe_down: 'Повлечи надолу за ажурирање',
        podcast_list_error_title:
          'Не можам да ја ажурирам листата на подкасти.',
        podcast_list_error_check_internet: 'Провери интернет конекција.',
        podcast_list_error_server:
          'Листата не е ажурирана. Грешка во конекција со серверот.',
        podcast_list_update_success: 'Листата е успешно ажурирана!',
        podcast_list_filter_alarm_music: 'Аларм – со музика',
        podcast_list_filter_alarm_no_music: 'Аларм – без музика',
        podcast_list_filter_ppp: 'ППП – Иван Варњу',
        podcast_list_filter_school: 'Вечерна школа на рокенрол',
        podcast_list_filter_emigration: 'Внатрешна емиграција',
        podcast_list_filter_underground: 'Луѓе од подземјето',
        podcast_list_filter_sports: 'Спортски поздрав',
        podcast_list_filter_stories: 'Топли човечки приказни',
        podcast_list_filter_disruption: 'Растројување',
        podcast_list_filter_offside: 'На работ од офсајд',
        //
        settings_settings: 'Поставки',
        settings_wifi_live_radio: 'Слушај лајв радио само преку Wi-Fi',
        settings_wifi_podcasts: 'Слушај онлајн подкаст само преку Wi-Fi',
        settings_wifi_podcasts_download: 'Симни подкасти само преку Wi-Fi',
        settings_delete_all: 'Избриши ги сите симнати подкасти',
        settings_number_of_downloaded: 'Број на симнати подкасти:',
        settings_total_size: 'Вкупна големина:',
        settings_exit_app: 'Излез од апликацијата',
        settings_color: 'Боја:',
        settings_app_language: 'Јазик на апликацијата:',
        settings_translators: 'Преведувачи:',
        settings_about_app: 'За апликацијата:',
        settings_version: 'Верзија:',
        settings_author: 'Автор: ',
        settings_contact: 'Контакт:   ',
        // settings_buy_me_a_coffee: 'Почасти го програмерот:',
        // settings_paypal: '- Преку PayPal:  ',
        // settings_bank_account_rsd: '- Уплата на динарска сметка:  ',
        // settings_bitcoin: '- Преку Bitcoin:  ',
        // settings_btc_network: 'BTC мрежа',
        // settings_lightning_network: 'Lightning мрежа',
        settings_copied: 'Копирано!',
        settings_wifi_info_title: 'Информации',
        settings_wifi_live_radio_info:
          'Со исклучување на оваа опција, дозволувате слушање радио во живо и преку мобилен интернет.',
        settings_wifi_podcast_info:
          'Со исклучување на оваа опција, дозволувате слушање подкасти и преку мобилен интернет.',
        settings_wifi_podcast_download_info:
          'Со исклучување на оваа опција, дозволувате подкастите да се преземаат и преку мобилен интернет.',
        settings_unsupported_features_title: 'Неподдржани опции',
        settings_unsupported_features_message:
          'Вашата верзија на Android не поддржува операции со подкасти.',
        //
        stream_count_listeners: 'Онлајн слушатели:',
        stream_count_unavailable: 'недостапно',
        stream_error_title: 'Не можам да пуштам радио.',
        stream_error_check_internet: 'Провери интернет конекција.',
        stream_error_wifi_only:
          'Во поставките на оваа апликација е вклучена опцијата „Слушај лајв радио само преку Wi-Fi“.\n\nИсклучи ја оваа опција ако сакаш да дозволиш слушање радио и преку мобилен интернет.',
        stream_unsupported_feature_title: 'Неподдржана опција',
        stream_unsupported_feature_message:
          'Вашата верзија на Android не го поддржува Stream 1.',
      },
    },
    eng: {
      translation: {
        app_player: 'Player',
        app_about_us: 'About us',
        app_settings: 'Settings',
        //
        // about_us_support_title_part_1:
        //   'OUR WORK COMPLETELY DEPENDS ON YOUR DONATIONS.',
        // about_us_support_title_part_2:
        //   'YOU CAN SUPPORT US IN THE FOLLOWING WAYS:',
        // about_us_support_part_1:
        //   'WITH A REGULAR MONTHLY OR ANNUAL DONATION ON PATREON:',
        // about_us_support_part_2: 'WITH PAYPAL:',
        // about_us_support_part_3: 'BY MAKING A PAYMENT TO OUR BANK ACCOUNT:',
        about_us_social_networks_title: 'FOLLOW US',
        about_us_shows_title_part_1: 'SCHEDULE OF SHOWS',
        about_us_shows_title_part_2: 'ON RADIO',
        about_us_shows_part_1: 'Every working day except Friday from 7 a.m:',
        about_us_shows_part_2: 'Alarm with Mlađa i Daško',
        about_us_shows_part_3: 'Weekdays from 11 a.m:',
        about_us_shows_part_4: 'Provisional Midday Program by Ivan Varnju',
        about_us_shows_part_5: 'Mondays at 8 p.m:',
        about_us_shows_part_6: 'Sports Greeting',
        about_us_shows_part_7: 'Tuesdays at 8 p.m:',
        about_us_shows_part_8: 'Evening School of Rock and Roll',
        about_us_shows_part_9: 'Wednesdays at 8 p.m:',
        about_us_shows_part_10: 'Underground People',
        about_us_shows_part_11: 'Thursdays at 8 p.m:',
        about_us_shows_part_12: 'On the Edge of Offside',

        about_us_story_title: 'OUR STORY',
        about_us_story_part_1:
          "It all started when Mlađa, working as a Santa Claus, brought Daško a package for New Year's Eve in 1987 at the company where Daško's mother and father worked.",
        about_us_story_part_2:
          "We recently tried to count, and we think we've known each other for about 20 years. Old friends from the punk scene.",
        about_us_story_part_3:
          'We played in bands, made fanzines, radio shows, serious magazines, organized concerts and parties.',
        about_us_story_part_4:
          "We met again at a joint radio job in the early spring of 2011, and since then we've seen and listened to each other almost every morning.",
        about_us_story_part_5:
          'In addition to our radio show, we regularly go on stage and joke, sing and make fools of ourselves live.',
        //
        control_center_error_title: "I can't play the podcast.",
        control_center_error_check_internet: 'Check your internet connection.',
        control_center_error_wifi_only:
          'In the settings of this application, the option "Listen to online podcasts only over WiFi" is enabled.\n\nDisable this option if you want to allow listening to podcasts over mobile internet.',
        //
        episode_play_error_title: "I can't download the podcast.",
        episode_play_error_check_internet: 'Check your internet connection.',
        episode_play_error_wifi_only_dl:
          'The "Download podcasts only over WiFi" option is enabled in the settings of this app.\n\nDisable this option if you want to allow podcasts to be downloaded over mobile internet.',
        day: 'day',
        days: 'days',
        days_ago: 'ago',

        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',

        january: 'january',
        february: 'february',
        march: 'march',
        april: 'april',
        may: 'may',
        june: 'june',
        july: 'july',
        august: 'august',
        september: 'september',
        october: 'october',
        november: 'november',
        december: 'december',

        episode_play_cancel_download: 'Cancel download',
        episode_play_delete_podcast: 'Delete podcast from memory',
        episode_play_download: 'Download for offline listening',
        //
        main_live_radio: 'Live Radio',
        main_podcast: 'Podcast',
        //
        podcast_back_to_list: 'Back to podcast list',
        //
        podcast_list_podcast_list: 'Podcast list',
        podcast_list_swipe_down: 'Swipe down to update / refresh',
        podcast_list_error_title: "I can't update the podcast list.",
        podcast_list_error_check_internet: 'Check your internet connection.',
        podcast_list_error_server:
          'The list is not updated. Error connecting to the server.',
        podcast_list_update_success: 'The list has been successfully updated!',
        podcast_list_filter_alarm_music: 'Alarm - with music',
        podcast_list_filter_alarm_no_music: 'Alarm - no music',
        podcast_list_filter_ppp: 'PPP - Ivan Varnju',
        podcast_list_filter_school: 'Evening School of RnR',
        podcast_list_filter_emigration: 'Inner Emigration',
        podcast_list_filter_underground: 'Underground People',
        podcast_list_filter_sports: 'Sports Greeting',
        podcast_list_filter_stories: 'Warm Human Stories',
        podcast_list_filter_disruption: 'Disruption',
        podcast_list_filter_offside: 'On the Edge of Offside',
        //
        settings_settings: 'Settings',
        settings_wifi_live_radio: 'Listen to live radio only over WiFi',
        settings_wifi_podcasts: 'Listen to online podcast only over WiFi',
        settings_wifi_podcasts_download: 'Download podcasts only over WiFi',
        settings_delete_all: 'Delete all downloaded podcasts',
        settings_number_of_downloaded: 'Number of downloaded podcasts:',
        settings_total_size: 'Total size:',
        settings_exit_app: 'Exit the app',
        settings_color: 'Color:',
        settings_app_language: 'App Language: ',
        settings_translators: 'Translators:',
        settings_about_app: 'About app:',
        settings_version: 'Version: ',
        settings_author: 'Author:',
        settings_contact: 'Contact:   ',
        // settings_buy_me_a_coffee: 'Buy the developer a coffee:',
        // settings_paypal: 'PayPal:  ',
        // settings_bank_account_rsd: '- Bank account (Serbian RSD currency):  ',
        // settings_bitcoin: '- Bitcoin:  ',
        // settings_btc_network: 'BTC Network',
        // settings_lightning_network: 'Lightning Network',
        settings_copied: 'Copied!',
        settings_wifi_info_title: 'Info',
        settings_wifi_live_radio_info:
          'By turning off this option, you allow listening to live radio over mobile internet.',
        settings_wifi_podcast_info:
          'By turning off this option, you allow listening to podcasts via mobile internet.',
        settings_wifi_podcast_download_info:
          'By turning off this option, you allow podcasts to be downloaded via mobile internet.',
        settings_unsupported_features_title: 'Unsupported options',
        settings_unsupported_features_message:
          'Your version of Android does not support podcast operations.',
        //
        stream_count_listeners: 'Online listeners:',
        stream_count_unavailable: 'unavailable',
        stream_error_title: "I can't play the radio.",
        stream_error_check_internet: 'Check your internet connection.',
        stream_error_wifi_only:
          'In the settings of this app, the option "Listen to live radio only over WiFi" is enabled.\n\nDisable this option if you want to allow listening to the radio over mobile internet.',
        stream_unsupported_feature_title: 'Unsupported option',
        stream_unsupported_feature_message:
          'Your version of Android does not support Stream 1.',
      },
    },
    deu: {
      translation: {
        app_player: 'Player',
        app_about_us: 'Über uns',
        app_settings: 'Einstellungen',
        //
        // about_us_support_title_part_1:
        // 'UNSERE ARBEIT IST VOLLSTÄNDIG AUF EURE SPENDEN ANGEWIESEN.',
        // about_us_support_title_part_2: 'DU KANNST UNS AUF FOLGENDE WEISE UNTERSTÜTZEN:',
        // about_us_support_part_1:
        //   'DURCH EINE REGELMÄẞIGE MONATLICHE ODER JÄHRLICHE SPENDE AUF PATREON:',
        // about_us_support_part_2: 'PAYPAL:',
        // about_us_support_part_3: 'DURCH EINE ÜBERWEISUNG AUF UNSER KONTO BEI DER OTP BANK:',
        about_us_social_networks_title: 'FOLGE UNS',
        about_us_shows_title_part_1: 'SENDUNGSPLAN',
        about_us_shows_title_part_2: 'IM RADIO',
        about_us_shows_part_1: 'Werktags (außer freitags), 07 Uhr:',
        about_us_shows_part_2: 'Alarm mit Mlađa und Daško',
        about_us_shows_part_3: 'Werktags, 11 Uhr:',
        about_us_shows_part_4: 'Vorläufiges Mittagsprogramm von Ivan Varnju',
        about_us_shows_part_5: 'Montag, 20 Uhr:',
        about_us_shows_part_6: 'Sportlicher Gruß',
        about_us_shows_part_7: 'Dienstag, 20 Uhr:',
        about_us_shows_part_8: 'Rock’n’Roll Abendschule',
        about_us_shows_part_9: 'Mittwoch, 20 Uhr:',
        about_us_shows_part_10: 'Menschen aus der Unterwelt',
        about_us_shows_part_11: 'Donnerstag, 20 Uhr:',
        about_us_shows_part_12: 'Am Abseitsrand',

        about_us_story_title: 'UNSERE WARME MÄNSCHLICHE GESCHICHTE',
        about_us_story_part_1:
          'Alles begann, als Mlađa, der als Weihnachtsmann herumgealbert hat, Daško ein Päckchen fürs Neue Jahr 1987 in der Firma brachte, in der Daškos Mama und Papa gearbeitet haben.',
        about_us_story_part_2:
          'Wir haben neulich mal nachgerechnet und denken, dass wir uns schon seit etwa 20 Jahren kennen. Alte Kumpel aus der Punkszene.',
        about_us_story_part_3:
          'Wir haben in Bands gespielt, Fanzines gemacht, Radiosendungen und ernsthafte Magazine produziert, Konzerte und Partys organisiert.',
        about_us_story_part_4:
          'Im frühen Frühling 2011 haben wir uns wieder beim gemeinsamen Radioprojekt getroffen, und seitdem sehen und hören wir uns fast jeden Morgen.',
        about_us_story_part_5:
          'Neben dem ganzen Radiogewerkel klettern wir ziemlich regelmäßig auf Bühnen und albern dort live herum, singen und blamieren uns.',
        //
        control_center_error_title: 'Ich krieg den Podcast nicht zum Laufen',
        control_center_error_check_internet:
          'Check mal deine Internetverbindung.',
        control_center_error_wifi_only:
          'In den App-Einstellungen ist die Option „Podcast nur über WLAN hören“ eingeschaltet.\n\nMach diese Option aus, wenn du Podcasts auch über mobile Daten hören möchtest',
        //
        episode_play_error_title: 'Ich kann den Podcast nicht herunterladen.',
        episode_play_error_check_internet:
          'Check mal deine Internetverbindung.',
        episode_play_error_wifi_only_dl:
          'In den Einstellungen dieser App ist die Option „Podcasts nur über WLAN herunterladen“ aktiviert.\n\nMach die Option aus, wenn du Podcasts auch über mobiles Internet downloaden willst.',
        day: 'Tag',
        days: 'Tage',
        days_ago: 'vor',

        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag',

        january: 'Januar',
        february: 'Februar',
        march: 'März',
        april: 'April',
        may: 'Mai',
        june: 'Juni',
        july: 'Juli',
        august: 'August',
        september: 'September',
        october: 'Oktober',
        november: 'November',
        december: 'Dezember',

        episode_play_cancel_download: 'Download abbrechen',
        episode_play_delete_podcast: 'Podcast aus dem Speicher löschen',
        episode_play_download: 'Zum Offline-Hören herunterladen',

        //
        main_live_radio: 'Live Radio',
        main_podcast: 'Podcast',
        //
        podcast_back_to_list: 'Zurück zur Podcast-Liste',
        //
        podcast_list_podcast_list: 'Podcast-Liste',
        podcast_list_swipe_down:
          'Nach unten ziehen zum Aktualisieren / Refreshen.',
        podcast_list_error_title:
          'Ich kann die Podcast-Liste nicht aktualisieren.',
        podcast_list_error_check_internet:
          'Check mal deine Internetverbindung.',
        podcast_list_error_server:
          'Die Liste wurde nicht aktualisiert. Verbindungsfehler mit dem Server.',
        podcast_list_update_success:
          'Die Liste wurde erfolgreich aktualisiert!',
        podcast_list_filter_alarm_music: 'Alarm - mit Musik',
        podcast_list_filter_alarm_no_music: 'Alarm - ohne Musik',
        podcast_list_filter_ppp: 'VMP - Ivan Varnju',
        podcast_list_filter_school: 'Rock’n’Roll Abendschule',
        podcast_list_filter_emigration: 'Innere Emigration',
        podcast_list_filter_underground: 'Menschen aus der Unterwelt',
        podcast_list_filter_sports: 'Sportlicher Gruß',
        podcast_list_filter_stories: 'Warme Mänschliche Geschichte',
        podcast_list_filter_disruption: 'Zerstreuung',
        podcast_list_filter_offside: 'Am Abseitsrand',
        //
        settings_settings: 'Einstellungen',
        settings_wifi_live_radio: 'Live-Radio nur mit WLAN hören',
        settings_wifi_podcasts: 'Höre Online-Podcasts nur über WLAN',
        settings_wifi_podcasts_download: 'Podcasts nur über WLAN herunterladen',
        settings_delete_all: 'Lösche alle heruntergeladenen Podcasts',
        settings_number_of_downloaded: 'Anzahl heruntergeladener Podcasts:',
        settings_total_size: 'Gesamtgröße:',
        settings_exit_app: 'App beenden',
        settings_color: 'Farbe:',
        settings_app_language: 'App-Sprache:',
        settings_translators: 'Übersetzer:',
        settings_about_app: 'Über die App:',
        settings_version: 'Version:',
        settings_author: 'Autor: ',
        settings_contact: 'Kontakt:   ',
        // settings_buy_me_a_coffee: 'Mit einer Mikrospende unterstützen:',
        // settings_paypal: '- mit PayPal:  ',
        // settings_bank_account_rsd: '- Überweisung auf das Konto in Dinar:  ',
        // settings_bitcoin: '- mit Bitcoin:  ',
        // settings_btc_network: 'BTC-Netzwerk',
        // settings_lightning_network: 'Lightning Netzwerk',
        settings_copied: 'Kopiert!',
        settings_wifi_info_title: 'Info',
        settings_wifi_live_radio_info:
          'Durch Deaktivieren dieser Option ermöglichen Sie das Hören von Live-Radio über mobiles Internet.',
        settings_wifi_podcast_info:
          'Durch Deaktivieren dieser Option ermöglichen Sie das Hören von Podcasts über mobiles Internet.',
        settings_wifi_podcast_download_info:
          'Durch Deaktivieren dieser Option erlauben Sie das Herunterladen von Podcasts über das mobile Internet.',
        settings_unsupported_features_title: 'Nicht unterstützte Optionen',
        settings_unsupported_features_message:
          'Ihre Android-Version unterstützt keine Podcast-Funktionen.',
        //
        stream_count_listeners: 'Online-Hörer:',
        stream_count_unavailable: 'nicht verfügbar',
        stream_error_title: 'Ich kann das Radio nicht abspielen.',
        stream_error_check_internet: 'Überprüfe die Internetverbindung.',
        stream_error_wifi_only:
          'In den Einstellungen dieser App ist die Option „Live-Radio nur über WLAN hören“ aktiviert.\n\nSchalte diese Option aus, wenn du das Radiohören auch über mobiles Internet zulassen willst.',
        stream_unsupported_feature_title: 'Nicht unterstützte Option',
        stream_unsupported_feature_message:
          'Ihre Android-Version unterstützt Stream 1 nicht.',
      },
    },
    jpn: {
      translation: {
        app_player: 'プレーヤー',
        app_about_us: '私達の事',
        app_settings: '設定',
        //
        // about_us_support_title_part_1:
        //   '私たちの仕事は完全にあなたの寄付に依存しています。',
        // about_us_support_title_part_2:
        //   'あなたは次の方法で私たちをサポートすることができます：',
        // about_us_support_part_1: 'Patreonでの恒久的な月間または年間寄付：',
        // about_us_support_part_2: 'PayPal:',
        // about_us_support_part_3: 'OTP銀行の口座へのお支払い：',
        about_us_social_networks_title: 'フォローする',
        about_us_shows_title_part_1: '排出スケジュール',
        about_us_shows_title_part_2: 'ラジオで',
        about_us_shows_part_1: '平日（金曜日を除く）、07 時:',
        about_us_shows_part_2: 'Mlađaと Daškoに警告',
        about_us_shows_part_3: '平日11時:',
        about_us_shows_part_4: 'Ivan Varnjuによる暫定正午プログラム',
        about_us_shows_part_5: '月曜日, 20時:',
        about_us_shows_part_6: 'スポーツ挨拶',
        about_us_shows_part_7: '火曜日20時:',
        about_us_shows_part_8: 'イブニング・スクール・オブ・ロックンロール',
        about_us_shows_part_9: '水曜日、20 時:',
        about_us_shows_part_10: 'アンダーグラウンドピープル',
        about_us_shows_part_11: '木曜日、20時:',
        about_us_shows_part_12: 'オフサイドの瀬戸際',

        about_us_story_title: '私たちの暖かいストーリー',
        about_us_story_part_1:
          'すべては、Mlađaはサンタクロースとして立ち往生していた若者が、Daškoのお母さんとお父さんが働いていた会社で、1987年の新年のためにDaškoに小包を持ってきたことから始まりました。',
        about_us_story_part_2:
          '私たちはちょうどいくつかの計算をしていて、私たちはお互いを約20年間知っていると思います。 パンクシーンの古い友達。',
        about_us_story_part_3:
          'バンドで演奏し、ファンジン、ラジオ番組、真面目な雑誌、組織されたコンサートやパーティーを作りました。',
        about_us_story_part_4:
          '2011年の初春、私たちは共同ラジオの仕事をしていましたが、それ以来、ほぼ毎朝お互いを見たり聞いたりしています。',
        about_us_story_part_5:
          'ラジオに加えて、私たちは定期的にステージを登ったり、冗談を言ったり、歌ったり、自分自身を困らせたりしています。',
        //
        control_center_error_title: 'ポッドキャストを再生できません',
        control_center_error_check_internet:
          'インターネット接続を確認してください。',
        control_center_error_wifi_only:
          'このアプリの設定で、[Wi - Fi経由でのみオンラインポッドキャストを聴く。 n nモバイルインターネット経由でもポッドキャストを聴くことを許可する場合は、このオプションをオフにします。',
        //
        episode_play_error_title: 'ポッドキャストをダウンロードできません。',
        episode_play_error_check_internet:
          'インターネット接続を確認してください。',
        episode_play_error_wifi_only_dl:
          'このアプリの設定では、「WiFi経由でのみポッドキャストをダウンロードします。 n nモバイルインターネット経由でもポッドキャストのダウンロードを許可する場合は、このオプションをオフにします。',
        day: '日',
        days: '日々',
        days_ago: '前',

        monday: '月曜日',
        tuesday: '火曜日',
        wednesday: '水曜日',
        thursday: '木曜日',
        friday: '金曜日',
        saturday: '土曜日',
        sunday: '日曜日',

        january: '1月',
        february: '２月',
        march: '3月',
        april: '４月',
        may: '5月',
        june: '6月',
        july: '7月',
        august: '8月',
        september: '9月',
        october: '10月',
        november: '11月',
        december: '12月',

        episode_play_cancel_download: 'ダウンロードをキャンセル',
        episode_play_delete_podcast: 'メモリからポッドキャストを削除',
        episode_play_download: 'オフラインリスニング用にダウンロード',

        //
        main_live_radio: 'liveラジオ',
        main_podcast: 'ポッドキャスト',
        //
        podcast_back_to_list: 'ポッドキャストリストに戻る',
        //
        podcast_list_podcast_list: 'ポッドキャストシート',
        podcast_list_swipe_down: 'プルダウンして更新/更新',
        podcast_list_error_title: 'ポッドキャストリストを更新できません。',
        podcast_list_error_check_internet:
          'インターネット接続を確認してください。',
        podcast_list_error_server:
          'リストは更新されていません。 サーバー接続エラー。',
        podcast_list_update_success: 'リストは正常に更新されました！',
        podcast_list_filter_alarm_music: 'アラーム-音楽付き',
        podcast_list_filter_alarm_no_music: 'アラーム-音楽なし',
        podcast_list_filter_ppp: 'PPP - Ivan Varnju',
        podcast_list_filter_school:
          'イブニング・スクール・オブ・ロックンロール',
        podcast_list_filter_emigration: '国内移民',
        podcast_list_filter_underground: 'アンダーグラウンドピープル',
        podcast_list_filter_sports: 'スポーツ挨拶',
        podcast_list_filter_stories: '暖かいストーリー',
        podcast_list_filter_disruption: '迷惑行為',
        podcast_list_filter_offside: 'オフサイドの瀬戸際',
        //
        settings_settings: '設定',
        settings_wifi_live_radio: 'Wi - Fi経由でのみliveラジオを聴く',
        settings_wifi_podcasts:
          'Wi - Fi経由でのみオンラインポッドキャストを聴く',
        settings_wifi_podcasts_download:
          'Wi - Fi経由でのみポッドキャストをダウンロード',
        settings_delete_all: 'ダウンロードしたすべてのポッドキャストを削除',
        settings_number_of_downloaded: 'ダウンロードしたポッドキャスト:',
        settings_total_size: '合計サイズ:',
        settings_exit_app: 'アプリケーションを終了',
        settings_color: '色:',
        settings_app_language: 'アプリケーション言語:',
        settings_translators: '翻訳者:',
        settings_about_app: 'アプリケーションの事:',
        settings_version: 'バージョン:',
        settings_author: '著者: ',
        settings_contact: 'コンタック:   ',
        // settings_buy_me_a_coffee: 'アプリケーターを扱う:',
        // settings_paypal: '- PayPal:  ',
        // settings_bank_account_rsd: '- ディナール口座へのお支払い:  ',
        // settings_bitcoin: '- Bitcoin:  ',
        // settings_btc_network: 'BTC Network',
        // settings_lightning_network: 'Lightning Network',
        settings_copied: 'コピーしました！',
        settings_wifi_info_title: '情報',
        settings_wifi_live_radio_info:
          'このオプションをオフにすると、モバイル インターネット経由でライブラジオを聴くことができます。',
        settings_wifi_podcast_info:
          'このオプションをオフにすると、モバイル インターネット経由でもポッドキャストを聴くことができるようになります。',
        settings_wifi_podcast_download_info:
          'このオプションをオフにすると、モバイル インターネット経由でポッドキャストをダウンロードできるようになります。',
        settings_unsupported_features_title: 'サポートされていないオプション',
        settings_unsupported_features_message:
          'お使いの Android バージョンはポッドキャストの操作をサポートしていません。',
        //
        stream_count_listeners: 'オンラインリスナー:',
        stream_count_unavailable: '利用不可',
        stream_error_title: 'ラジオを聴くことができません。',
        stream_error_check_internet: 'インターネット接続を確認してください。',
        stream_error_wifi_only:
          'このアプリの設定で、[Wi - Fi経由でのみオンラインポッドキャストを聴く。 n nモバイルインターネット経由でもポッドキャストを聴くことを許可する場合は、このオプションをオフにします。',
        stream_unsupported_feature_title: 'サポートされていないオプション',
        stream_unsupported_feature_message:
          'お使いの Android バージョンはストリーム 1 をサポートしていません。',
      },
    },
  },
  lng: 'srp',
  fallbackLng: 'srp',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
