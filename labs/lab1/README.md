<div align="center">
  
<h1 align="center">Laboratorio 1 de Arquitectura de Software (ARSW)</h1>

<p align="center">
Manejo basico de Maven con Java y uso correcto de Git y Github
</p>

</div>

</br>


## Antes de comenzar

En primer lugar, es importante tener en cuenta que las herramientas Maven y Git ya se encuentran instaladas y configuradas en el sistema. Se asume que estos son prerrequisitos preexistentes en el dispositivo, por lo que no se abordará su proceso de instalación.

![versions](/docs/versions.jpeg)


</br>
</br>

## Creacion del proyecto

Para inicializar un nuevo proyecto, simplemente se debe ejecutar un único comando. Este se encargará de generar automáticamente toda la estructura de directorios y archivos necesarios para comenzar. Dando como resultado el siguiente proceso:

```sh
mvn archetype:generate -DgroupId=edu.escuelaing.arsw.ASE.app -DartifactId=mi-primera-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

cd mi-primera-app
```

![initial](/docs/initial.jpeg)

Podemos validar la creacion del proyecto usando el comando `tree` en nuestra consola:

![tree](/docs/tree.jpeg)


</br>
</br>

## Construccion del proyecto

Se finalizó la etapa de construcción y ejecución del proyecto. Se corrió el comando mvn package, el cual completó el ciclo de vida de Maven hasta la fase de empaquetado, generando el archivo .jar en el directorio target. Posteriormente, se ejecutó dicho artefacto, verificando su funcionamiento con el resultado "Hello World!" esperado.

```sh
java -cp target/mi-primera-app-1.0-SNAPSHOT.jar edu.escuelaing.arsw.ASE.app.App
```


![Run](/docs/run.jpeg)


</br>
</br>

## Instalacion de plugins y dependencias

En nuestro proyecto, tenemos un archivo llamado POM.xml, el cual nos permite añadir plugins y dependencias, de modo que es posible añadir funcionalidades específicas a nuestro proyecto. En este caso, se coloca un plugin de documentación automática como ejemplo.

![pom](/docs/pom.jpeg)

Podemos validar el funcionamiento volviendo a construir el proyecto con el comando `mvn clean package`, recordando que se pueden ejecutar de forma secuencial los ciclos de vida en Maven.

![Run](/docs/runmvn.jpeg)

![Doc](/docs/doc.png)

</br>
</br>

## Primeros pasos en Git

Para poder registrar la autoría en cada commit, es fundamental configurar la identidad en Git. Esto se logra estableciendo el nombre de usuario y el correo electrónico de forma global, asegurando que toda contribución quede correctamente atribuida.

```sh
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

resultado es el siguiente, donde apreciamos la configuracion de nuestro git en caso de usar el comando `git config`.

![conf](/docs/conf.jpeg)


</br>
</br>

## Trabajando con git

Para comenzar a versionar un proyecto, el primer paso es inicializar un repositorio de Git en el directorio raíz del mismo. Esto se realiza con el comando `git init`, el cual crea el subdirectorio oculto .git donde se almacenará todo el historial. El siguiente paso es Añadir archivos al Staging Area, por lo que utiliza el comando `git add <archivo>` para preparar los archivos que formarán parte de la próxima "fotografía" o versión del proyecto. 

![add](/docs/add.jpeg)

Luego, tenemos que confirmar los cambios con el comando `git commit -m "mensaje descriptivo"`, se crea un punto de guardado conocido como commit en el historial del repositorio. El mensaje debe explicar de forma clara qué cambios se realizaron.

![add](/docs/commit.jpeg)

Antes de poder continuar, tenemos que vincular el repositorio local a uno remoto (alojado en la plataformas GitHub). Para ello, se usa el comando `git remote add origin <URL_DEL_REPOSITORIO>` para asociar la URL remota bajo el alias origin. Es decir, subimos la rama origin que tenemos en local a la URL que proporcionamos, y el cambio se refleja en la URL despues de validar las credenciales. 

Finalmente, los commits locales se envían al repositorio remoto. El comando `git push -u origin master` sube el contenido de la rama master al remoto origin. La bandera -u establece un seguimiento para que en futuros pushes solo sea necesario ejecutar git push. No obstante, tambien se puede realizar el comando `git push` si ya nos encontramos en la rama que esta sincronizada con la remota.

![add](/docs/push.jpeg)

</br>
</br>

## Archivos escenciales con git

Todo proyecto de software robusto debe incluir archivos que describan su propósito, licencia y configuración de versionado. Pues con estos, es posible mantener una estructura limpia, documentada y comoda para cualquier colaborador o visitande del repositorio. Por lo cual se añaden los siguientes archivos:
* README.txt: Actúa como la portada del proyecto. Explica qué es, para qué sirve y cómo usarlo.
* LICENSE.txt: Define los términos legales bajo los cuales otros pueden usar, modificar y distribuir el código.
* .gitignore: Un archivo crucial que le indica a Git qué archivos o directorios debe ignorar y no incluir en el control de versiones.

Siguiendo la guia, vamos a generar los archivos correspondientes a la *Licencia* y el *Readme*.

![add](/docs/docs.jpeg)

Podemos ver el estado del repositorio para apreciar que Git detecta cuando hay nuevos archivos en el sistema.

![add](/docs/pushig.jpeg)

En el archivo .gitignore, se añadió la entrada target/. Esta es una práctica estándar y fundamental en proyectos Java gestionados con Maven. La razón es que el directorio target es donde Maven guarda todo el resultado de la compilación del código, las dependencias descargadas y el artefacto final del proyecto. Estos archivos son generados automáticamente a partir del código fuente. Se ignoran por tres motivos principales:
- Redundancia: No tiene sentido versionar archivos que se pueden generar en cualquier momento desde el código fuente con un simple mvn package.
- Tamaño del Repositorio: Los artefactos y dependencias pueden ser muy pesados, y versionarlos aumentaría innecesariamente el tamaño del repositorio.
- Conflictos: Incluir archivos generados es una fuente común de conflictos de merge entre desarrolladores.
Resultando en el siguiente archivo

![add](/docs/ignore.jpeg)

Finalmente, podemos subir los cambios realizados en nuestro local directo al remoto usando los comandos que vimos con anterioridad.
(Aca yo subi sin querer el target, pero se elimina en este commit para evitar que siga estando en el repo)

![add](/docs/status.jpeg)

![add](/docs/target.jpeg)

Y volvemos a subir con el push.


</br>
</br>

## Clonacion y logs
Para trabajar en este proyecto desde otro equipo, se utiliza el comando git clone. Este comando crea una copia local completa e independiente del proyecto en tu máquina. Para ello, se ejecuta de la siguiente manera:

```sh
git clone <URL_DEL_REPOSITORIO>
```

Una vez clonado, tienes una copia funcional del proyecto con todo su historial. El comando configura automáticamente la conexión con el repositorio remoto bajo el alias origin, por lo que puedes empezar a trabajar y ejecutar comandos del proyecto, como `mvn package`, de inmediato. Cualquier cambio que realices en tu copia local no afectará a otros hasta que lo subas al repositorio central.

![add](/docs/clone.jpeg)

Por otro lado, hay una lista de comandos básicos en Git que son fundamentales para la productividad y el control de calidad. Conocerlas te ayudará a gestionar mejor el flujo de trabajo:
- git log: Te permite ver el historial de commits del proyecto. Es extremadamente útil para entender la evolución del código. Puedes usarlo con opciones como git log --oneline --graph --decorate para obtener una vista compacta y gráfica de las ramas y commits.

- git diff: Muestra las diferencias exactas entre los archivos de tu directorio de trabajo y lo que hay en el staging area o en el último commit. Es una herramienta clave para revisar tus cambios antes de confirmarlos.

- git branch: Se usa para crear, listar y eliminar ramas. Las ramas son esenciales para trabajar en nuevas funcionalidades o corregir errores de forma aislada sin afectar la rama principal (main o master).

- git switch o git checkout: Te permite cambiar entre las diferentes ramas que existen en tu repositorio.

gracias a estos, podemos hacer cosas como crear una rama llamada *develop*, poder subirla y trabajae en dicha rama para luego  

![add](/docs/log.jpeg)


</br>
</br>

## License
Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.
