 Note
  1. Why are segments useful?
  Suppose you want to create ocean waves.
  with
  new THREE.PlaneGeometry(5, 5, 1, 1);
  you only have 4 vertices.
  You cannot create smooth waves.
  with this 
  new THREE.PlaneGeometry(5, 5, 100, 100);
  Now there are thousands of vertices.

  More segments allow lighting to interpolate more smoothly across a surface, making curved objects look more realistic.

 2. new THREE.BoxGeometry(
    2, // width
    2, // height
    2, // depth
    4, // width segments
    4, // height segments
    4  // depth segments
    );
    Rule to remember
  Size (width, height, depth) controls how big the object is.
  Segments control how detailed the object's mesh is by dividing it into smaller pieces.

3. also learned about ShpereGeometry
4. what is Buffer Geometry ?

    A BufferGeometry is the lowest-level way to create a 3D shape in Three.js.

      * you tell Three.js:
      "Here are all my vertices. Connect them to make triangles."
      You:
      Vertex 1 is here.
      Vertex 2 is here.
      Vertex 3 is here.

      Three.js:
      "I'll draw the triangle."

      * You manually build the geometry.


      # Why is it called BufferGeometry?
      The GPU (graphics card) doesn't understand JavaScript objects.
      It understands arrays of numbers.

      Example:
      [
      0,0,0, // for 1 vertex we need to 3 cordinate
      1,0,0,
      0,1,0
      ]

      This array is stored inside a buffer and sent directly to the GPU.
      That's why it's called BufferGeometry.

      # how draw traingle
      Vertex 1
      x=0
      y=0
      z=0

      Vertex 2
      x=1
      y=0
      z=0

      Vertex 3
      x=0
      y=1
      z=0

      Since there are 3 vertices, Three.js draws one triangle.
