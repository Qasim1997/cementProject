<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search= $request['serarch'];
        if ($search != '') {
            $product = product::where('name','LIKE',"$search")->get();
        } else {
            return product::all();
        }


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function create(Request $request){
            $request->validate([
                'name'=>'required',
                'price'=>'required',
                'stock'=>'required',
                'user'=>'required'

            ]);


            $user = product::create([
                'name'=>$request->name,
                'price'=>$request->price,
                'stock'=>$request->stock,
                'user'=>$request->user,
            ]);
            return response([
                'message' => 'Product add Successfully',
                'status'=>'success'
            ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(product $product , $id)
    {
        return product::find($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)

        {

            $student = product::find($id);
                $student->update($request->all());
                return response([
                     'data' =>$student,
                    'message' => 'Product edit Successfully',
                    'status'=>'success'
                ], 201);
        }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = product::find($id)->delete();
        return response([
            'data' =>$student,
           'message' => 'Product delete Successfully',
           'status'=>'success'
       ], 201);

    }
}
