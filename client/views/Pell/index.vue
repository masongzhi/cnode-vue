<template>
  <div class="content">
    <h1>pell</h1>
    <div id="pell" class="pell"></div>
    <div style="margin-top:20px;">
      <h3>Text output:</h3>
      <div id="text-output"></div>
    </div>
    <div style="margin-top:20px;">
      <h3>HTML output:</h3>
      <pre id="html-output"></pre>
    </div>
  </div>
</template>
<script>
  import pell from 'pell/dist/pell'

  export default {
    methods: {
      ensureHTTP (str) {
        return /^https?:\/\//.test(str) && str || `http://${str}`
      }
    },
    mounted () {
      console.log('#pell', document.getElementById('pell'))
      // Initialize pell on an HTMLElement
      pell.init({
        element: document.getElementById('pell'),
        styleWithCSS: false,
        actions: [
          'bold',
          'underline',
          'italic',
          {
            name: 'zitalic',
            icon: 'Z',
            title: 'Zitalic',
            result: () => pell.exec('italic')
          },
          {
            name: 'image',
            result: () => {
              const url = window.prompt('Enter the image URL')
              if (url) pell.exec('insertImage', this.ensureHTTP(url))
            }
          },
          {
            name: 'link',
            result: () => {
              const url = window.prompt('Enter the link URL')
              if (url) pell.exec('createLink', this.ensureHTTP(url))
            }
          }
        ],
        onChange: function (html) {
          document.getElementById('text-output').innerHTML = html
          document.getElementById('html-output').textContent = html
        }
      })
    }
  }
</script>
<style>
  @import '../../../node_modules/pell/dist/pell.min.css';
  .pell-content {
    height: 400px;
  }
  body {
    margin: 0;
    padding: 0;
  }
  .content {
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 600px;
    padding: 20px;
  }
  #html-output {
    white-space: pre-wrap;
  }
</style>
