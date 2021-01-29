# Projekt końcowy 

*Alicja Bielska 234854*

*Konrad Kazieczko 236787*

*Piotr Pawlak 234991*

## Opis konfiguracji
Do wykonania zadania został postawiony serwer VPS, na którym zainstalowaliśmy dockera dla potrzeb postawienia kontenera z obrazem jenkins (jenkins/jenkins:2.263.3). 
Serwer również został wykorzystany do wdrożenia aplikacji. Stworzony został drugi kontener z obrazem docker in docker (docker:dind), który pozwala na budowanie aplikacji za pomoca kontenerów dockerowych.
Aby umożliwić narzędziu Jenkins budowanie i wdrożenie aplikacji na kontenerze docker in docker należało ustawić ten kontener jako DOCKER_HOST. 

### Schemat konfiguracji

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/schemat%20konfiguracji.png)

## Działające środowisko
### Aplikacja

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/plans.png)

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/faculty.png)

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/lectures.png)

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/tutor.png)

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/lecture-time.png)

### Jenkins

![Screenshot](https://github.com/PeterPwlk/PSI/blob/master/Img/jenkins.png)


## Refleksje
### Docker
Część backendowa aplikacji potrzebowała multi-stage builda by skonstruować produkcyjną wersję aplikacji. Dzięki temu można było w jednym kontenerze zainstalować wszystkie zależności dla aplikacji, a następnie zbudować ją do wersji produkcyjnej. Backend aplikacji składa się z 2 pakietów Persistence oraz web-api. Dla obu z nich zależy zainstalować zależności a następnie przetraspilować aplikację z Typescript do JavaScript. Dzięki temu zabiegowi waga już produkcyjnej aplikacji jest dużo mniejsza niż wersji deweloperskiej, a także wyłączone są wszystkie developerskie narzędzia mogące spowolnić działanie aplikacji.

### Jenkins
Narzędzie Jenkins zostało wykorzystane do budowania aplikacji i do jej wdrożenia. Udostępnia bardzo duzo funkcjonalności oraz jest intuicyjne w pracy. Dużym minusem Jenkinsa jest to, że nie jest on dla każdego. Nalezy posiadac dobre zasoby komputera aby móc postawić u siebie to narzedzie. W poczatkowych planach Jenkins miał równiez odpowiadać, za przeprowadzanie testów, jednak ku naszemu zdziwieniu podczas wykonywania testów backendowych narzędzie się zawieszało. Obecnie wykonywane sa tylko testy frontendowe.

